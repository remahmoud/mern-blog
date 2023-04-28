const mongoose = require("mongoose");

module.exports = () => {
    mongoose.set("strictQuery", false);
    mongoose
        .connect(process.env.MONGODB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            family: 4,
        })
        .then(() => {
            console.log("connected to database successfully");
        })
        .catch((err) => {
            console.error(err);
        });
};
