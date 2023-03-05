// Book Model
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: [String],
        required: true
    },
    ISBN: {
        type: String,
        required: true,
        unique: true
    },
    publisher: {
        type: String,
        required: true
    },
    publish_date: {
        type: Date,
        // required: true
        default: Date.now
    },
    edition: {
        type: Number,
        required: true
    },
    pages: {
        type: Number,
        // required: true
    },
    format: {
        type: String,
        // required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
    },
    // category: {
    //     type: String,
        
    // },
 
    category: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
        required: true
    },
    
    stock: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Book', bookSchema);
