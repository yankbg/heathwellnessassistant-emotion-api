const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

const {saveFeedback} = require('../controllers/feedbackController');
const {getModelVersions, publishVersion} = require('../controllers/modelController');

// Apply authentication middleware to all routes in this router
router.use(auth); 

// Route to handle feedback submission
router.post('/feedback', saveFeedback);
// Route to get the latest model version and update info
router.get('/model/version', getModelVersions);
// Route to publish a new model version
router.post('/model/publish', publishVersion);

module.exports = router;