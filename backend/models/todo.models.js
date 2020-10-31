const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema ({
    description: {
        type: String,
        required: true,
        maxlength: 300
    },
    date: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

const Exercise = mongoose.model('todo', todoSchema);
module.exports = Exercise;