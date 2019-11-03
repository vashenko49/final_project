const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    price: {
        type: String,
        require: true
    },
    description: {
        type: String,
        required: true
    },
    rewiews: [
        {
            userName: {
                type: String,
                required: true
            },
            rating: {
                type: Number
            },
            date: {
                type: Date,
                required: true,
                default: Date.now
            },
            description: {
                type: String,
                required: true,
                unique: true
            }
        }
    ]
});

module.exports = mongoose.model('product', ProductSchema);
