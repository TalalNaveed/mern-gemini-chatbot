const express = require('express');
const router = express.Router();
const Conversation = require('../models/conversation');



// ✅ Get all conversations
router.get('/conversations', async (req, res) => {
  const convos = await Conversation.find().sort({ createdAt: -1 });
  res.json(convos);
});




// ✅ Get one conversation by ID
router.get('/conversations/:id', async (req, res) => {
  try {
    const convo = await Conversation.findById(req.params.id);
    if (!convo) {
      return res.status(404).json({ error: 'Conversation not found' });
    }
    res.json(convo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch conversation' });
  }
});

// ✅ Create new conversation
router.post('/conversations', async (req, res) => {
  const { title, messages } = req.body;
  const convo = new Conversation({ title, messages });
  await convo.save();
  res.json(convo);
});

// ✅ Add message to conversation
router.post('/conversations/:id/messages', async (req, res) => {
  const convo = await Conversation.findById(req.params.id);
  convo.messages.push(req.body);
  await convo.save();
  res.json(convo);
});

// ✅ Update feedback and optional comment
router.patch('/conversations/:id/messages/:msgIndex/feedback', async (req, res) => {
  const { feedback, comment } = req.body;

  try {
    const convo = await Conversation.findById(req.params.id);
    if (!convo) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    const msg = convo.messages[req.params.msgIndex];
    if (!msg) {
      return res.status(404).json({ error: 'Message not found' });
    }

    msg.feedback = feedback;
    if (comment) msg.comment = comment;

    await convo.save();
    res.json(convo);
  } catch (err) {
    console.error('❌ Error saving feedback:', err);
    res.status(500).json({ error: 'Failed to update feedback' });
  }
});

// ✅ Dashboard metrics route
router.get('/dashboard/metrics', async (req, res) => {
  try {
    const conversations = await Conversation.find();

    let totalBotResponses = 0;
    let totalExecutionTime = 0;
    let failedResponses = 0;
    let feedbackCount = 0;
    let totalUserMessages = 0;
    let feedbackPositive = 0;
    let feedbackNegative = 0;
    let feedbackNeutral = 0;

    const feedbackMessages = [];

    const weeklyInteractions = {
      Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0
    };

    conversations.forEach(convo => {
      convo.messages.forEach((msg, index) => {
        const day = new Date(msg.timestamp).toLocaleDateString('en-US', {
          weekday: 'short'
        });

        if (msg.role === 'user') {
          totalUserMessages++;
          weeklyInteractions[day] = (weeklyInteractions[day] || 0) + 1;
        }

        if (msg.role === 'bot') {
          totalBotResponses++;

          if (msg.executionTime) {
            totalExecutionTime += parseFloat(msg.executionTime);
          }

          if (msg.success === false) {
            failedResponses++;
          }

          if (msg.feedback === '👍') {
            feedbackPositive++;
            feedbackCount++;
            feedbackMessages.push({
              text: msg.text,
              feedback: msg.feedback,
              comment: msg.comment || '',
              timestamp: msg.timestamp,
            });
          } else if (msg.feedback === '👎') {
            feedbackNegative++;
            feedbackCount++;
            feedbackMessages.push({
              text: msg.text,
              feedback: msg.feedback,
              comment: msg.comment || '',
              timestamp: msg.timestamp,
            });
          } else {
            // No feedback = neutral
            feedbackNeutral++;
          }

        }
      });
    });

    // Sort by most recent
    const recentFeedback = feedbackMessages
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      

    const averageResponseTime =
      totalBotResponses > 0 ? (totalExecutionTime / totalBotResponses).toFixed(2) : 0;

    const successRate =
      totalBotResponses > 0
        ? (((totalBotResponses - failedResponses) / totalBotResponses) * 100).toFixed(1)
        : 0;

    const orderedDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weeklyData = orderedDays.map(day => weeklyInteractions[day] || 0);

    res.json({
      averageResponseTime,
      failedResponses,
      totalInteractions: totalUserMessages,
      feedbackCount,
      feedbackPositive,
      feedbackNegative,
      feedbackNeutral,
      successRate,
      weeklyInteractions: weeklyData,
      recentFeedback, // ✅ send to frontend
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to compute metrics' });
  }
});


// ✅ Delete a conversation
router.delete('/conversations/:id', async (req, res) => {
  try {
    await Conversation.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Conversation deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete conversation' });
  }
});



module.exports = router;
