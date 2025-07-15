const express = require('express');
const router = express.Router();
const Url = require('../models/Url');
const { nanoid } = require('nanoid');

router.post('/shorten', async (req, res) => {
  const { originalUrl, customCode, validityMinutes } = req.body;
  const code = customCode || nanoid(6);
  const exists = await Url.findOne({ shortCode: code });

  if (exists && !customCode) return res.status(409).json({ message: 'Shortcode already exists' });

  const expiresAt = new Date(Date.now() + (validityMinutes || 30) * 60000);

  const url = new Url({ originalUrl, shortCode: code, expiresAt });
  await url.save();

  res.json({ shortUrl: `http://localhost:3000/${code}` });
});

router.get('/:code', async (req, res) => {
  const { code } = req.params;
  const urlDoc = await Url.findOne({ shortCode: code });

  if (!urlDoc || new Date() > urlDoc.expiresAt) {
    return res.status(404).json({ message: 'URL not found or expired' });
  }

  res.redirect(urlDoc.originalUrl);
});

module.exports = router;
