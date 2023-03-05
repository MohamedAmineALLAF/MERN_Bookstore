const { createReview, getReviewsByBook, getAverageRating } = require("../controllers/ReviewController");
const { isLogedIn } = require("../middleware/auth");

const router = require("express").Router();


router.post('/reviews/:bookId',isLogedIn,createReview);
router.get('/reviews/:bookId',getReviewsByBook);
router.get('/reviews/:bookId/rate',getAverageRating);

// router.get("/books/:id", getBook);

// router.post("/books", createBook);

// router.put("/books/:id", updateBook);

// router.delete("/books/:id", deleteBook);


module.exports = router;