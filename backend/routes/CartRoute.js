const { addBookToCart, removeBookFromCart, updateBookQuantity, getCart, clearCart, calculateTotalPrice } = require("../controllers/CartController");
const { isLogedIn } = require("../middleware/auth");
const router = require("express").Router();


router.post("/:bookId/add",isLogedIn, addBookToCart);
router.put("/:bookId/remove",isLogedIn, removeBookFromCart);
router.patch("/quantity",isLogedIn, updateBookQuantity);
router.get("/",isLogedIn, getCart);
router.put("/clear",isLogedIn, clearCart);

router.get("/totalprice",isLogedIn, calculateTotalPrice);

module.exports = router;  