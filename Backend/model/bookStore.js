const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
  bookId: {
    type: String,
    required: true,
    unique:false
  },
});


const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
