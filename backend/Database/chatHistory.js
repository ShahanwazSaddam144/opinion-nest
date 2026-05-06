const mongoose = require("mongoose");

const chatHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    business_name: {
      type: String,
      required: true,
      trim: true,
    },
    business_industry: {
      type: String,
      required: true,
      trim: true,
    },
    business_description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("chatHistory", chatHistorySchema);