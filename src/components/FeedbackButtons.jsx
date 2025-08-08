import { useState } from 'react';
import './FeedbackButtons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faCopy } from '@fortawesome/free-solid-svg-icons';

const API_BASE = process.env.REACT_APP_API_BASE;

export default function FeedbackButtons({ conversationId, messageIndex, feedback: initialFeedback, messageText }) {
  const [showInput, setShowInput] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [submitted, setSubmitted] = useState(!!initialFeedback);
  const [selected, setSelected] = useState(initialFeedback || '');
  const [feedbackCompleted, setFeedbackCompleted] = useState(false);
  const [copied, setCopied] = useState(false);

  const sendFeedback = async (emoji, text = '') => {
    try {
      const res = await fetch(
        `${API_BASE}/conversations/${conversationId}/messages/${messageIndex}/feedback`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ feedback: emoji, comment: text }),
        }
      );
      if (res.ok) {
        setSubmitted(true);
        setSelected(emoji);
        setShowInput(false);
        setFeedbackText('');

        // ✅ Hide feedback message and buttons after delay
        setTimeout(() => {
          setSubmitted(false);
          setFeedbackCompleted(true);
        }, 1500);
      } else {
        console.error('❌ Feedback not saved');
      }
    } catch (err) {
      console.error('❌ Error sending feedback:', err);
    }
  };

  const handleThumbsUp = () => {
    sendFeedback('👍');
  };

  const handleThumbsDown = () => {
    setSelected('👎');
    setShowInput(true);
  };

  const handleSubmit = () => {
    sendFeedback('👎', feedbackText);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(messageText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('❌ Failed to copy:', err);
    }
  };

  if (feedbackCompleted) return null;

  return (
    <div className="feedback-container">
      {submitted ? (
        <div className="feedback-confirmed"></div>
      ) : !showInput ? (
        <div className="feedback-buttons">
          <button className="icon-button" onClick={handleThumbsUp} title="Good response">
            <FontAwesomeIcon icon={faThumbsUp} style={{ color: selected === '👍' ? '#3ecf8e' : '#333' }} />
          </button>
          <button className="icon-button" onClick={handleThumbsDown} title="Bad response">
            <FontAwesomeIcon icon={faThumbsDown} style={{ color: selected === '👎' ? '#ef4444' : '#333' }} />
          </button>
          <button className="icon-button copy-btn" onClick={copyToClipboard} title="Copy response">
            <FontAwesomeIcon icon={faCopy} style={{ color: selected === '👍' ? '#3ecf8e' : '#333' }}/>
          </button>
          {copied && <span className="copy-confirmed"></span>}
        </div>
      ) : (
        <div className="feedback-form">
          <textarea
            className="feedback-textarea"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="What went wrong?"
          />
          <button className="feedback-submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
