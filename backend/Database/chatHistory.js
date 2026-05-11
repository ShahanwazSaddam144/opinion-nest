const mongoose = require("mongoose");

const yearlyAnalysisSchema = new mongoose.Schema(
  {
    year: {
      type: Number,
      default: 0,
    },

    revenue: {
      type: Number,
      default: 0,
    },

    profit: {
      type: Number,
      default: 0,
    },

    investment: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const scaleSchema = new mongoose.Schema(
  {
    workers: {
      type: Number,
      default: 0,
    },

    investment: {
      type: Number,
      default: 0,
    },

    revenue: {
      type: Number,
      default: 0,
    },

    profit: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

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
        type: Number,
        default: 0,
      },

      profit_range: {
        type: String,
        default: "",
      },

      risk: {
        type: String,
        default: "",
      },

      label: {
        type: String,
        default: "",
      },

      scale_detected: {
        type: String,
        default: "",
      },

      past_summary: {
        type: String,
        default: "",
      },

      future_summary: {
        type: String,
        default: "",
      },

      past_yearly_analysis: {
        summary: {
          type: String,
          default: "",
        },

        data: {
          type: [yearlyAnalysisSchema],
          default: [],
        },
      },

      yearly_analysis: {
        type: [yearlyAnalysisSchema],
        default: [],
      },

      scale: {
        small: {
          type: scaleSchema,
          default: () => ({}),
        },

        medium: {
          type: scaleSchema,
          default: () => ({}),
        },

        large: {
          type: scaleSchema,
          default: () => ({}),
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("chatHistory", chatHistorySchema);