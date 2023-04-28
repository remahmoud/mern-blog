const AuthController = require("../controller/auth.controller");
const router = require("express").Router();
const schema = require("../utils/schema");
const validator = require("../middleware/validator");
const isAuth = require("../middleware/isAuth");

// ---- User Data ---- //
router.get("/me", isAuth, AuthController.getMyData);

// ---- User Login ---- //
router.post("/login", validator(schema.login), AuthController.login);

// ---- User Register ---- //
router.post("/register", validator(schema.register), AuthController.register);

module.exports = router;
