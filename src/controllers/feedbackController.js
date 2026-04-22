const feedback = require('../models/feedbackModel');

const saveFeedback = async (req, res) => {
    try {
        // Extract feedback data from the request body
        const { text, predictedEmotion, correctedEmotion, confidence, isCorrect } = req.body;

        // Create a new feedback document
        const feedback = new Feedback({
            text,
            predictedEmotion,
            correctedEmotion,
            confidence,
            isCorrect
        });

        // Save the feedback to the database
        const savedFeedback = await feedback.save();
        
        // Send a success response
        return res.status(201).json({ 
            message: 'Feedback saved successfully', 
            success: true,
            data: savedFeedback
        });
    } catch (error) {
        console.error('Error saving feedback:', error);
        // Send an error response
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    saveFeedback
};