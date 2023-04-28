const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        // check token availability
        if (!token) {
            return res.status(401).json({ message: "Access Denied" });
        }

        // decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // set user info
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({ message: "Unexpected error" });
    }
};
