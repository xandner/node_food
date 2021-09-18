const router = require("express").Router();
const resturantRoutes = require("./resturantRoutes");

router.get("/", (req, res) => {
    const apiList=[
        {
            "/":"get all resturant",
            "/create":"create a new resturant", 
            "/:id":"get resturant"
        }
    ]
    res.status(200).send(apiList)
});
router.use("/resturant", resturantRoutes);

module.exports = router;
