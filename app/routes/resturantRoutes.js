const router = require("express").Router();
const controller=require("../http/controller/resturantController")

router.get("/", controller.getList);
router.get("/:id", controller.getOne);
router.post("/create", controller.create);
router.put("/update/:id", controller.update);
router.delete("/delete/:id", controller.delete);
router.post("/login", controller.login);


module.exports = router;
