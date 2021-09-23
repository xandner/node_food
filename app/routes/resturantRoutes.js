const router = require("express").Router();
const multer = require("multer");
const controller = require("../http/controller/resturantController");

const authMiddleware = require("../http/middleware/auth");
const resturantAdminMiddleware = require("../http/middleware/resturantAdmin");

const storage=multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})
const upload = multer({storage:storage})

router.get("/", controller.getList);
router.get("/:id", controller.getOne);
router.post("/create", controller.create);
router.put("/update/:id", controller.update);
router.delete("/delete/:id", controller.delete);
router.post("/login", controller.login);

router.post(
  "/food/add_food",
  [authMiddleware, resturantAdminMiddleware,upload.single("foodPhoto")],
  controller.add_food
);
router.get("/food/get_food", authMiddleware, controller.get_food);
router.delete("/food/:id", [authMiddleware, resturantAdminMiddleware],controller.delete_food)
router.put("/food/:id", [authMiddleware, resturantAdminMiddleware],controller.update_food)
router.post("/food/photo", [authMiddleware, resturantAdminMiddleware,upload.single("foodPhoto")],controller.setFoodPhoto)


module.exports = router;
