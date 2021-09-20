const router = require("express").Router();
const controller = require("../http/controller/resturantController");

const authMiddleware = require("../http/middleware/auth");
const resturantAdminMiddleware = require("../http/middleware/resturantAdmin");

router.get("/", controller.getList);
router.get("/:id", controller.getOne);
router.post("/create", controller.create);
router.put("/update/:id", controller.update);
router.delete("/delete/:id", controller.delete);
router.post("/login", controller.login);

router.post(
  "/food/add_food",
  [authMiddleware, resturantAdminMiddleware],
  controller.add_food
);
router.get("/food/get_food", authMiddleware, controller.get_food);
router.delete("/food/:id", [authMiddleware, resturantAdminMiddleware],controller.delete_food)
router.put("/food/:id", [authMiddleware, resturantAdminMiddleware],controller.update_food)

module.exports = router;
