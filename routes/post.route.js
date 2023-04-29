const router = require("express").Router();
const Controller = require("../controller/post.controller");
const schema = require("../utils/schema");
const validator = require("../middleware/validator");
const isAuth = require("../middleware/isAuth");

// ----- Get Posts for homepage ----- //
router.get("/", Controller.getAll);

// ----- Get Post By ID ----- //
router.get("/:postId", Controller.getById);

// ----- Create New Post ----- //
router.post("/", isAuth, validator(schema.post), Controller.create);

// ----- Update Post By ID ----- //
router.put("/:postId", isAuth, validator(schema.post), Controller.update);

// ----- Delete Post By ID ----- //
router.delete("/:postId", isAuth, Controller.delete);

module.exports = router;
