require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const chatRoutes = require('./routes/chat');
const geminiRoute = require('./routes/gemini');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', chatRoutes);
app.use('/api', geminiRoute);



mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('Mongo Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
