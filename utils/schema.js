const Joi = require("joi");

module.exports.register = Joi.object({
    first_name: Joi.string().min(2).required().label("first name"),
    last_name: Joi.string().min(2).required().label("last name"),
    email: Joi.string().email().min(4).required(),
    password: Joi.string().min(8).required(),
});
module.exports.login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});
module.exports.post = Joi.object({
    title: Joi.string().required(),
    summary: Joi.string().required(),
    category: Joi.string().required(),
    content: Joi.string().required(),
});
