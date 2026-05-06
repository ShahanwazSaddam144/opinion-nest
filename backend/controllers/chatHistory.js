const express = require("express");
const router = express.Router();
const chatHistory = require("../Database/chatHistory");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/chat-history", authMiddleware, async (req, res) => {
  try {
    const { business_name, business_industry, business_description } = req.body;

    if (!business_name || !business_industry || !business_description) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const newChatHistory = new chatHistory({
      user: req.user._id,        
      email: req.user.email,     
      business_name,
      business_industry,
      business_description,
    });

    await newChatHistory.save();

    res.status(200).json({
      success: true,
      message: "Chat History Saved",
    });

  } catch (err) {
    console.error("Chat History Error:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

router.get("/chat-history", authMiddleware, async (req, res) => {
  try {
    const history = await chatHistory.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      data: history,
    });

  } catch (err) {
    console.error("Chat History Fetch Error:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;