const { signup, getUsers, login, updateProfile, changePassword, viewProfile, deleteAccount, makeAdmin, removeAdmin, blockUser, unblockUser } = require("../controllers/UserController");
const { check } = require('express-validator');
const { isLogedIn, userAuth, adminAuth, checkBlocked, isBlocked, createCart } = require("../middleware/auth");
const router = require("express").Router();



router.post("/signup",[
    check('name')
      .not()
      .isEmpty(),
    check('email')
      .normalizeEmail() // Test@test.com => test@test.com
      .isEmail(),
    check('password').isLength({ min: 6 })
  ],signup);
 
  router.get('/', getUsers);
  
  router.get("/admin/:userId",viewProfile);

router.post("/login",isBlocked, login);

router.put("/admin/:userId",adminAuth,updateProfile);

router.patch("/me/changePassword",adminAuth,changePassword);
router.patch("/admin/:userId/makeadmin",makeAdmin);
router.patch("/admin/:userId/removeadmin",adminAuth,removeAdmin);
router.patch("/admin/:userId/block",adminAuth,blockUser);
router.patch("/admin/:userId/unblock",adminAuth,unblockUser);
router.delete("/admin/:userId",adminAuth,deleteAccount);


module.exports = router;
