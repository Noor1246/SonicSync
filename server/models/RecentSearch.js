const mongoose = require("mongoose");

const recentSearchSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    query: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "RecentSearch",
  recentSearchSchema
);