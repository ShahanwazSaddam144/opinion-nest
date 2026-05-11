const express = require("express");
const router = express.Router();
const chatHistory = require("../Database/chatHistory");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/chat-history", authMiddleware, async (req, res) => {
  try {
    const {
      business_name,
      business_industry,
      business_description,
      ai_result,
    } = req.body;

    if (
      !business_name ||
      !business_industry ||
      !business_description
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const formattedPastAnalysis =
      ai_result?.past_yearly_analysis?.data ||
      ai_result?.past_yearly_analysis ||
      [];

    const formattedFutureAnalysis =
      ai_result?.yearly_analysis || [];

    const newChatHistory = new chatHistory({
      user: req.user._id,
      email: req.user.email,

      business_name,
      business_industry,
      business_description,

      ai_result: {
        overview:
          ai_result?.overview ||
          ai_result?.description ||
          "",

        investment:
          ai_result?.investment || "",

        workers:
          Number(ai_result?.workers || 0),

        profit_range:
          ai_result?.profit_range ||
          ai_result?.profit?.range ||
          "",

        risk:
          ai_result?.risk || "",

        label:
          ai_result?.label || "",

        scale_detected:
          ai_result?.scale_detected || "",

        past_summary:
          ai_result?.past_summary ||
          ai_result?.past_yearly_analysis?.summary ||
          "",

        future_summary:
          ai_result?.future_summary || "",

        past_yearly_analysis: {
          summary:
            ai_result?.past_summary ||
            ai_result?.past_yearly_analysis?.summary ||
            "",

          data: formattedPastAnalysis.map((item) => ({
            year: Number(item.year),
            revenue: Number(item.revenue || 0),
            profit: Number(item.profit || 0),
            investment: Number(item.investment || 0),
          })),
        },

        yearly_analysis:
          formattedFutureAnalysis.map((item) => ({
            year: Number(item.year),
            revenue: Number(item.revenue || 0),
            profit: Number(item.profit || 0),
            investment: Number(item.investment || 0),
          })),

        scale: {
          small: {
            workers: Number(
              ai_result?.scale?.small?.workers || 0
            ),
            investment: Number(
              ai_result?.scale?.small?.investment || 0
            ),
            revenue: Number(
              ai_result?.scale?.small?.revenue || 0
            ),
            profit: Number(
              ai_result?.scale?.small?.profit || 0
            ),
          },

          medium: {
            workers: Number(
              ai_result?.scale?.medium?.workers || 0
            ),
            investment: Number(
              ai_result?.scale?.medium?.investment || 0
            ),
            revenue: Number(
              ai_result?.scale?.medium?.revenue || 0
            ),
            profit: Number(
              ai_result?.scale?.medium?.profit || 0
            ),
          },

          large: {
            workers: Number(
              ai_result?.scale?.large?.workers || 0
            ),
            investment: Number(
              ai_result?.scale?.large?.investment || 0
            ),
            revenue: Number(
              ai_result?.scale?.large?.revenue || 0
            ),
            profit: Number(
              ai_result?.scale?.large?.profit || 0
            ),
          },
        },
      },
    });

    await newChatHistory.save();

    res.status(200).json({
      success: true,
      data: newChatHistory,
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
    const history = await chatHistory
      .find({
        user: req.user._id,
      })
      .sort({ createdAt: -1 });

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

router.delete("/chat-history/:id", authMiddleware, async (req, res) => {
  try {
    const deletedChat = await chatHistory.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!deletedChat) {
      return res.status(404).json({
        success: false,
        message: "Chat History Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Chat History Deleted Successfully",
    });

  } catch (err) {
    console.error("Delete Chat History Error:", err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

router.delete("/chat-history", authMiddleware, async (req, res) => {
  try {
    await chatHistory.deleteMany({
      user: req.user._id,
    });

    res.status(200).json({
      success: true,
      message: "All Chat History Deleted Successfully",
    });

  } catch (err) {
    console.error("Delete All Chat History Error:", err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;