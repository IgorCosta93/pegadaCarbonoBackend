const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const StudentSchema = new Schema({
    name: {
        type: String,
        trim: true,  
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    ra: {
        type: String,
        trim: true,
        required: true
    },
    questions: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Questions",
            description: {
                name: "Perguntas",
                jsonSchemaSelect: true
            }
        }
    ],
    createdOn: {
        type: Date,
        "default" : Date.now
    }
});

module.exports = mongoose.model('Student', StudentSchema);