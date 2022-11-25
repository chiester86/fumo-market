const Router = require("express");
const router = new Router();
const FumoController = require("../controllers/fumoController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole("ADMIN"), FumoController.create);
router.get("/", FumoController.getAll);
router.get("/:id", FumoController.getOne);
router.delete("/:id", checkRole("ADMIN"), FumoController.delete);
router.put("/:id", checkRole("ADMIN"), FumoController.update);

module.exports = router;
