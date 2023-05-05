const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const AuthRoutes = require("./routes/auth.route");
const PostRoutes = require("./routes/post.route");

require("dotenv").config();
require("./config/dbConnect")();

const app = express();
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(
    cors({
        origin: "*",
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ----- Routes ----- //
// ----- Auth ----- //
app.use("/api/auth", AuthRoutes);
// ----- Post ----- //
app.use("/api/posts", PostRoutes);

app.listen(port, () =>
    console.log("server running on http://localhost:" + port)
);
