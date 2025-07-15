const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('./middleware/logger');
const urlRoutes = require('./routes/urlRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger); 

mongoose.connect('mongodb://localhost:27017/urlshortener', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'));

app.use('/api/url', urlRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
