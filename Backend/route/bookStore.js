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

router.get("/book/all",async(req,res)=>{
  const {bookId} = req.body
  try {
    const book = await Book.find()
    return res.json({"message":"All book id", book}).status(202);
  } catch (error) {
    return res.json({"message":"Failed all book"
    }).status(500)
  }
})

module.exports = router