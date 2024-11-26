const mongoose = require("mongoose");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const { v4: uuidv4 } = require("uuid"); // Import UUID library

const User = mongoose.model(
  "user",
  new mongoose.Schema(
    {
      firstName: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50,
      },
      lastName: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        minLength: 5,
        maxLength: 255,
      },
      password: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 1024,
      },
      
    },
    { timestamps: true }
  )
);

const validateUser = (user) => {
  const userSchema = Joi.object({
    firstName: Joi.string().min(5).max(50).required(),
    lastName: Joi.string().min(5).max(50).required(),
    password: Joi.string().min(5).max(50).required(),
    email: Joi.string().email().min(5).max(255).required(),
  });

  const validationResult = userSchema.validate(user);
  return validationResult;
};

const validatePassword = ({ name, password }) => {
  if (password.toLowerCase().includes(name.toLowerCase())) {
    return { error: "Password cannot contain username" };
  }
  return passwordComplexity().validate(password);
};

module.exports = { User, validateUser, validatePassword };
