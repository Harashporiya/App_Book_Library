const Router = require("express")
const router = Router();
const Book = require("../model/bookStore")
const books = []

router.post("/book", async (req, res) => {
    const { bookId } = req.body;
    if (!bookId) {
        return res.status(400).json({ error: 'Book ID is required' });
    }
    try {
        
        const newBook = new Book({ bookId });
        await newBook.save();
    
        return res.status(201).json({ message: 'Book stored successfully' });
      } catch (error) {
        console.error('Error saving book:', error);
        return res.status(500).json({ error: 'Failed to store the book' });
      }
})

module.exports = router