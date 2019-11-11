const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('category', CategorySchema);
