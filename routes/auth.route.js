const Controller = require("../controller/auth.controller");
const router = require("express").Router();
const schema = require("../utils/schema");
const validator = require("../middleware/validator");
const isAuth = require("../middleware/isAuth");

// ---- User Data ---- //
router.get("/whoami", isAuth, Controller.getMyData);

// ---- User Login ---- //
router.post("/login", validator(schema.login), Controller.login);

// ---- User Register ---- //
router.post("/register", validator(schema.register), Controller.register);

module.exports = router;
