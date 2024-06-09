const mongoose = require("mongoose");

const IncidentSchema = new mongoose.Schema({
  lat: String,
  lng: String,
  // reportedAt: { type: Date, default: Date.now },
  description: String,
});

const Report = mongoose.model("Report", IncidentSchema);

module.exports = Report;
