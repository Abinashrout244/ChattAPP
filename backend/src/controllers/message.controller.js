const { User } = require("../model/auth.model");
const { Message } = require("../model/message.model");
const sharp = require("sharp");

const axios = require("axios");

const getAllUser = async (req, res) => {
  try {
    const logedinUser = req.getUser;
    const allUser = await User.find({ _id: { $ne: logedinUser._id } }).select(
      "-password",
    );
    res.status(200).json({ message: "All users", data: allUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.getUser._id;

    let finalImage = null;
    if (!text && !req.file) {
      return res.status(400).json({
        success: false,
        message: "Message must contain either text or an image",
      });
    }

    if (req.file) {
      // SHARP STARTS HERE
      const compressedBuffer = await sharp(req.file.buffer)
        .resize(800, 800, {
          fit: "inside",
          withoutEnlargement: true,
        })
        .jpeg({ quality: 70 }) // Drastically reduces file size
        .toBuffer();
      // SHARP ENDS HERE

      // Convert the small buffer to a string for your DB
      finalImage = `data:image/jpeg;base64,${compressedBuffer.toString("base64")}`;
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
      image: finalImage,
    });

    res.status(200).json({ success: true, data: newMessage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const receiveMessage = async (req, res) => {
  try {
    const logedinUser = req.getUser;
    const { id: userToChatId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: logedinUser._id, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: logedinUser._id },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json({ messages });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAllUser, sendMessage, receiveMessage };
