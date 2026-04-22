const express = require('express');
const router = express.Router();
const {saveFeedback} = require('../controllers/feedbackController');

// Route to handle feedback submission
router.post('/', saveFeedback);

module.exports = router;