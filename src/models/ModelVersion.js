const mongoose = require('mongoose');

const modelVersionSchema = new mongoose.Schema({
    version: {
        type: Number,
        required: true
    },
    tfliteUrl: {
        type: String,
        required: true
    },
    vocabUrl: {
        type: String,
        required: true
    },
    releasedAt: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String,
        default: ''
    },
    fileSizeBytes: {
        type: Number,
        default: 0
    }
});

const ModelVersion = mongoose.model('ModelVersion', modelVersionSchema);

module.exports = ModelVersion;