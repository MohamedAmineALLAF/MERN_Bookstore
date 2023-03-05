// Order Model
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    books: [{
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    total_price: {
        type: Number,
        required: true
    },
    shipping_address: {
        type: String,
        required: true
    },
    payment_status: {
        type: String,
        required: true
    },
    delivery_status: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);
