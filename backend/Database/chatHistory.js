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

    ai_result: {
      overview: {
        type: String,
        default: "",
      },

      investment: {
        type: String,
        default: "",
      },

      workers: {
        type: String,
        default: "",
      },

      profit_range: {
        type: String,
        default: "",
      },

      risk: {
        type: String,
        default: "",
      },

      past_yearly_analysis: [
        {
          year: String,
          revenue: Number,
          profit: Number,
        },
      ],

      yearly_analysis: [
        {
          year: String,
          revenue: Number,
          profit: Number,
        },
      ],

      scale: {
        small: {
          workers: String,
          investment: String,
          revenue: String,
          profit: String,
        },

        medium: {
          workers: String,
          investment: String,
          revenue: String,
          profit: String,
        },

        large: {
          workers: String,
          investment: String,
          revenue: String,
          profit: String,
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("chatHistory", chatHistorySchema);