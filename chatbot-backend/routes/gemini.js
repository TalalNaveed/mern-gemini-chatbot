const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const path = require('path'); // ✅ Required to resolve paths

// POST /api/gemini/reply
router.post('/generate', async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage || typeof userMessage !== 'string') {
    return res.status(400).json({ error: 'Invalid input message' });
  }

  const scriptPath = path.join(__dirname, '..', 'gemini_generate.py');

  const command = `python "${scriptPath}" "${userMessage.replace(/"/g, '\\"')}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Python exec error:', error.message);
      return res.status(500).json({ error: 'Gemini execution failed' });
    }

    if (stderr) {
      console.error('⚠️ Python stderr:', stderr);
    }

    res.json({ reply: stdout.trim() });
  });
});

module.exports = router;
