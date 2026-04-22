const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const {saveFeedback} = require('../controllers/feedbackController');

// Apply authentication middleware to all routes in this router
router.use(auth); 

// Route to handle feedback submission
router.post('/feedback', saveFeedback);

module.exports = router;