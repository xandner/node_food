const _ = require("lodash");
const bcrypt = require("bcrypt");

const resturantMode = require("../../models/resturant");
const {
  validatorCreateResturant,
} = require("../validator/createResturantValidator");
const { validatorLoginResturant } = require("../validator/loginValidator");
const { foodValidator } = require("../validator/createFoodVaidator");

class ResturantController {
  async getList(req, res) {
    const list = await resturantMode
      .find()
      .select("name description score adminUsername pic address")
      .limit(20);
    res.send(list);
  }
  async getOne(req, res) {
    const id = req.params.id;
    if (!id) return res.status(400).send("you should enter id");
    const data = await resturantMode.findById(id).select("-adminPassword");
    if (!data) return res.status(404).send("resturant not found");
    res.status(200).send(data);
  }
  async create(req, res) {
    const { error } = validatorCreateResturant(req.body);
    if (error) return res.status(400).send(error.message);
    let resturant = new resturantMode(
      _.pick(req.body, [
        "name",
        "description",
        "addresse",
        "adminUsername",
        "adminPassword",
      ])
    );
    const salt = await bcrypt.genSalt(10);
    resturant.adminPassword = await bcrypt.hash(resturant.adminPassword, salt);
    await resturant.save();
    res.status(200).send(resturant);
  }
  async update(req, res) {
    const id = req.params.id;
    if (!id) return res.status(400).send("you should enter id");
    const { error } = validatorCreateResturant(req.body);
    if (error) res.status(400).send(error);
    const data = await resturantMode.findByIdAndUpdate(
      id,
      {
        $set: _.pick(req.body, [
          "name",
          "description",
          "addresse",
          "adminUsername",
          "adminPassword",
        ]),
      },
      { new: true }
    );
    if (!data) return res.status(404).send("resturant not found");
    res
      .status(200)
      .send(_.pick(data, ["name", "description", "addresse", "adminUsername"]));
  }
  async delete(req, res) {
    const id = req.params.id;
    if (!id) return res.status(400).send("you should enter id");
    const data = await resturantMode.findByIdAndRemove(id);
    res.send("ok");
  }

  async login(req, res) {
    const { error } = validatorLoginResturant(req.body);
    if (error) return res.status(400).send(error.message);
    const user = await resturantMode.findOne({
      adminUsername: req.body.adminUsername,
    });
    if (!user) return res.status(404).send("user not found");
    const result = await bcrypt.compare(
      req.body.adminPassword,
      user.adminPassword
    );
    if (!result) return res.status(404).send("password is wrong");
    const token = await user.generateAuthToken();
    res.header("x-auth-token", token).status(200).send(token);
  }

  async add_food(req, res) {
    const resturant = await resturantMode.findOne({
      adminUsername: req.user.adminUsername,
    });
    if (!resturant) return res.status(404).send("resturant not found");
    const { error } = foodValidator(req.body);
    if (error) return res.status(400).send(error.message);
    resturant.menu.push(_.pick(req.body, ["name", "description", "price"]));
    const menu = await resturant.save();
    res.status(200).send(menu);
  }
  async get_food(req, res) {
    //
  }
}

module.exports = new ResturantController();
