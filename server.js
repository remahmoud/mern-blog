const cors = require("cors");
const express = require("express");
const morgan = require("morgan");

require("dotenv").config();
require("./config/dbConnect")();

const app = express();
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () =>
    console.log("server running on http://localhost:" + port)
);
