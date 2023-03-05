const { payBook } = require("../controllers/OrderController");

const router = require("express").Router();


router.post('/paybook',payBook);




module.exports = router;