const _ = require("lodash");
const bcrypt = require("bcrypt");

const resturantMode = require("../../models/resturant");
const {
  validatorCreateResturant,
} = require("../validator/createResturantValidator");

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
    const data = await resturantMode.findByIdAndUpdate(id, {
      $set: _.pick(req.body, [
        "name",
        "description",
        "addresse",
        "adminUsername",
        "adminPassword",
      ]),
    },{new:true});
    if (!data) return res.status(404).send("resturant not found");
    res
      .status(200)
      .send(
        _.pick(data, ["name", "description", "addresse", "adminUsername"])
      );
  }
  async delete(req, res) {
    const id = req.params.id;
    if (!id) return res.status(400).send("you should enter id");
    const data=await resturantMode.findByIdAndRemove(id);
    res.send("ok")
  }
}

module.exports = new ResturantController();