const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  role: String, 
  text: String,
  timestamp: { type: Date, default: Date.now },
  executionTime: Number,
  feedback: String, 
  comment: String,  
});

const ConversationSchema = new mongoose.Schema({
  title: String,
  messages: [MessageSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Conversation', ConversationSchema);
