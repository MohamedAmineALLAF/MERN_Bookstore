const { getBooks, getBook, createBook, updateBook, deleteBook, searchBooks, filterBooks, getFeatBooks } = require("../controllers/BookController");
const { adminAuth } = require("../middleware/auth.js");


const router = require("express").Router();

router.get("/books", getBooks);

router.get("/book/:id", getBook);

router.get("/featbooks", getFeatBooks);

router.post("/books", createBook); 

router.put("/books/:id",adminAuth , updateBook);

router.delete("/books/:id",adminAuth , deleteBook);

router.get("/books/search",searchBooks)

router.get("/books/filter",filterBooks)

module.exports = router;