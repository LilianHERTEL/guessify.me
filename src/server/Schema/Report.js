const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema(
  {
    author: {
      type: String
    },
    target: {
      type: String
    },
    reason: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

let Report = mongoose.model("reports", reportSchema);

module.exports = Report;
