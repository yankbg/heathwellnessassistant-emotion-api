const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500
    },
    predictedEmotion: {
        type: String,
        required: true,
        enum: ['sadness', 'joy', 'love', 'anger', 'fear', 'surprise']
    },
    correctedEmotion: {
        type: String,
        required: true,
        enum: ['sadness', 'joy', 'love', 'anger', 'fear', 'surprise']
    },
    confidence: {
        type: Number,
        min: 0,
        max: 1
    },
    isCorrect: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;