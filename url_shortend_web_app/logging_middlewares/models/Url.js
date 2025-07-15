const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortCode: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: Date
});

module.exports = mongoose.model('Url', urlSchema);
