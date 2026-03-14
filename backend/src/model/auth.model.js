const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "This field should Mandatory"],
      minLength: 3,
      maxLength: 20,
    },
    lastName: {
      type: String,
      minLength: 3,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Provide a Valid Email Address" + " " + value);
        }
      },
    },

    password: {
      type: String,

      select: false,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Provide a Strong Passowrd" + " " + value);
        }
      },
    },
    photoURL: {
      type: String,
      validate(value) {
        if (!validator.isURL(value) && !value.startsWith("data:image")) {
          throw new Error("Provide a valid Image URL or Base64 image");
        }
      },
      default:
        "https://tse2.mm.bing.net/th/id/OIP.CIn8fInVEpY4ti24C9LfWgHaFJ?pid=Api&P=0&h=180",
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "others"],
        message: "{VALUE} is not a valid gender Type",
      },
    },
    about: {
      type: String,
      default: "Add About",
      maxLength: 200,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.statics.getHashPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

userSchema.methods.getAuthToken = async function () {
  const token = await jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

userSchema.methods.comparePassword = async function (userInputPassword) {
  if (!this.password) return false;
  const isPassword = await bcrypt.compare(userInputPassword, this.password);
  return isPassword;
};

const User = mongoose.model("user", userSchema);
module.exports = { User };
