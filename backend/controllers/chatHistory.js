const express = require("express");
const router = express.Router();
const chatHistory = require("../Database/chatHistory");
const { authMiddleware } = require("../middleware/authMiddleware");
const http = require("http");
const https = require("https");
const { URL } = require("url");

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

    let finalAiResult = ai_result;

    if (!finalAiResult) {
      try {
        const predictUrl = process.env.FASTAPI_URL || "http://localhost:8000/predict";
        const urlObj = new URL(predictUrl);
        const postData = JSON.stringify({ name: business_name, industry: business_industry, description: business_description });

        finalAiResult = await new Promise((resolve, reject) => {
          const lib = urlObj.protocol === "https:" ? https : http;

          const options = {
            hostname: urlObj.hostname,
            port: urlObj.port || (urlObj.protocol === "https:" ? 443 : 80),
            path: urlObj.pathname + (urlObj.search || ""),
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Content-Length": Buffer.byteLength(postData),
            },
          };

          const r = lib.request(options, (resp) => {
            let body = "";
            resp.on("data", (chunk) => (body += chunk));
            resp.on("end", () => {
              try {
                const parsed = JSON.parse(body || "{}");
                resolve(parsed);
              } catch (e) {
                reject(e);
              }
            });
          });

          r.on("error", (err) => reject(err));
          r.write(postData);
          r.end();
        });
      } catch (err) {
        console.error("External Predict Error:", err);
        finalAiResult = null;
      }
    }

    const formattedPastAnalysis =
      finalAiResult?.past_yearly_analysis?.data ||
      finalAiResult?.past_yearly_analysis ||
      [];

    const formattedFutureAnalysis =
      finalAiResult?.yearly_analysis || [];

    const newChatHistory = new chatHistory({
      user: req.user._id,
      email: req.user.email,

      business_name,
      business_industry,
      business_description,

      ai_result: {
        overview:
          finalAiResult?.overview ||
          finalAiResult?.description ||
          "",

        investment:
          finalAiResult?.investment || "",

        workers:
          Number(finalAiResult?.workers || 0),

        profit_range:
          finalAiResult?.profit_range ||
          finalAiResult?.profit?.range ||
          "",

        risk:
          finalAiResult?.risk || "",

        label:
          finalAiResult?.label || "",

        scale_detected:
          finalAiResult?.scale_detected || "",

        past_summary:
          finalAiResult?.past_summary ||
          finalAiResult?.past_yearly_analysis?.summary ||
          "",

        future_summary:
          finalAiResult?.future_summary || "",

        past_yearly_analysis:
          formattedPastAnalysis.map((item) => ({
            year: Number(item.year),
            revenue: Number(item.revenue || 0),
            profit: Number(item.profit || 0),
            investment: Number(item.investment || 0),
          })),

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
              finalAiResult?.scale?.small?.workers || 0
            ),
            investment: Number(
              finalAiResult?.scale?.small?.investment || 0
            ),
            revenue: Number(
              finalAiResult?.scale?.small?.revenue || 0
            ),
            profit: Number(
              finalAiResult?.scale?.small?.profit || 0
            ),
          },

          medium: {
            workers: Number(
              finalAiResult?.scale?.medium?.workers || 0
            ),
            investment: Number(
              finalAiResult?.scale?.medium?.investment || 0
            ),
            revenue: Number(
              finalAiResult?.scale?.medium?.revenue || 0
            ),
            profit: Number(
              finalAiResult?.scale?.medium?.profit || 0
            ),
          },

          large: {
            workers: Number(
              finalAiResult?.scale?.large?.workers || 0
            ),
            investment: Number(
              finalAiResult?.scale?.large?.investment || 0
            ),
            revenue: Number(
              finalAiResult?.scale?.large?.revenue || 0
            ),
            profit: Number(
              finalAiResult?.scale?.large?.profit || 0
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