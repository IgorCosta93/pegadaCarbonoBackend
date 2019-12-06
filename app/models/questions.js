const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const QuestionsSchema = new Schema({
    question1: {
        type: Number,
        required: true
    },
    question2: {
        type: Number,
        required: true
    },
    question3: {
        type: Number,
        required: true
    },
    question4: {
        type: Number,
        required: true
    },
    question5: {
        type: Number,
        required: true
    },
    question6: {
        type: Number,
        required: true
    },
    question7: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    trees: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        required: true,
    },
    createdOn: {
        type: Date,
        "default" : Date.now
    }
});

module.exports = mongoose.model('Questions', QuestionsSchema);