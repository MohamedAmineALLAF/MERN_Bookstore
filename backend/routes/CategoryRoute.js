const { getCategories, createCategory, getCategory,updateCategory,deleteCategory } = require("../controllers/CategoryController");
const { adminAuth } = require("../middleware/auth");

const router = require("express").Router();

router.get("/categories", getCategories);

router.post("/categories", createCategory);

router.get("/category/:id", getCategory);

router.put("/category/:id",adminAuth,updateCategory);

router.delete("/category/:id",adminAuth,deleteCategory);

module.exports = router;