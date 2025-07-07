const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  featuredImage: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
