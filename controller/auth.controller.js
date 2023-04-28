const User = require("../models/user.model");

// ----- Auth Controller ----- //
class AuthController {
    // Login Controller
    async login(req, res) {
        // find user
        const user = await User.findOne({ email: req.body.email }).select(
            "+password"
        );
        // if user is not found return error
        if (!user) {
            return res.status(400).json({ message: "invalid email" });
        }
        // check if user password is correct
        const isPassword = await user.checkPassword(req.body.password);
        if (!isPassword) {
            return res.status(400).json({ message: "wrong password" });
        }
        // generate access token
        const token = user.generateToken();
        return res.status(200).json({ token });
    }

    // Create New User
    async register(req, res) {
        // check if email is already registered
        let emailTaken = await User.findOne({ email: req.body.email });
        if (emailTaken) {
            return res.status(400).json({ message: "email already exists" });
        }
        // create user instance
        const user = new User({ ...req.body });
        // save user instance
        await user.save();
        // final response
        return res.status(201).json({ message: "User created successfully" });
    }

    // Get User Data
    async getMyData(req, res) {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        return res.status(200).json(user);
    }
}

module.exports = new AuthController();
