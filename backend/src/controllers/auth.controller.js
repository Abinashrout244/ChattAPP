const { User } = require("../model/auth.model");

const { validateSignupData } = require("../utils/validateData");

const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, emailId, password, about, gender, photoURL } =
      req.body;
    if (!firstName || !emailId || !password) {
      return res.status(400).json({ message: "Feild Must Be Required" });
    }
    validateSignupData(req);

    const existingUser = await User.findOne({ emailId: emailId });
    if (existingUser) {
      return res.status(409).json({ message: "User Already Exists!!" });
    }

    const hashPassword = await User.getHashPassword(password);

    const newUser = await User.create({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
      about,
      gender,
      photoURL,
    });

    const token = await newUser.getAuthToken();

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res
      .status(201)
      .json({ message: "User Register Succesfully", token, newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
};

const loginUser = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const findUser = await User.findOne({ emailId: emailId }).select(
      "+password",
    );

    if (!findUser) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }

    const isPassword = await findUser.comparePassword(password);
    if (!isPassword) {
      return res.status(404).json({ message: "invalid Credenitials" });
    }

    const token = await findUser.getAuthToken();
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.json({ message: "User LogedIn Sucessfully", token, findUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.json({ success: true, message: "Logout Successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = req.getUser;
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const profileEdit = async (req, res) => {
  try {
    const logedinUser = req.getUser;

    const updateData = await User.findByIdAndUpdate(
      { _id: logedinUser._id },
      req.body,
      { returnDocument: "after", runValidators: true },
    );

    if (!updateData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Keep both keys for compatibility with existing clients.
    res.status(200).json({
      message: "Update Successfully",
      user: updateData,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { _id } = req.getUser; // from auth middleware
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(_id).select("+password");

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Current password is incorrect" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  profileEdit,

  changePassword,
};
