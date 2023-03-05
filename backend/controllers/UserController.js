const User = require('../models/User');
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator');
const Cart = require('../models/Cart');


// exports.getMe =  (req,res) => {
//     res.json({message:'user data'})
//  } 

// exports.protect = async (req, res, next) => {
//     let token;
  
//     if (
//       req.headers.authorization &&
//       req.headers.authorization.startsWith("Bearer")
//     ) {
//       try {
//         // Get token from header
//         token = req.headers.authorization.split(" ")[1];
  
//         // Verify token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
//         // Get user from the token
//         req.user = await User.findById(decoded.id).select("-password");
  
//         next();
//       } catch (error) {
//         console.log(error);
//         res.status(401);
//         throw new Error("Not authorized");
//       }
//     }
  
//     if (!token) {
//       res.status(401);
//       throw new Error("Not authorized, no token");
//     }
//   }; 

exports.getUsers = async (req, res) => {
    try {
        
        const users = await User.find({}, '-password');
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: 'Error getting users', error });
    }
};

exports.signup = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
          );
        }
        const { name, email, password, address, phone } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already exists' });
        }
        const user = new User({ name, email, password, address, phone });
        const newUser=await user.save();
        let id = newUser.id
        const newCart = new Cart({
        user: id,
        books: [], 
        total_price: 0
        });
       const cart = await newCart.save();
       console.log(cart);
        const token = jwt.sign({ id }, process.env.Prv_KEY ,{expiresIn:"9000000"});
        const cookieOption ={
            expires : new Date(Date.now()+90000000),
            secure:false,
            httpOnly:true
        }
        res.cookie('ms2a',token,cookieOption)
        res.status(201).json({ message: 'User created successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Email or password is incorrect {email}' });
        }
        const isMatch = await user.comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Email or password is incorrect' });
        }
        let id = user.id
        const token = jwt.sign({ id },  process.env.Prv_KEY ,{expiresIn:"90000000"});
        const cookieOption ={
            expires : new Date(Date.now()+90000000),
            secure:false,
            httpOnly:true
        }
        delete user.password;
        res.cookie('ms2a',token,cookieOption)
        // res.header("Authorization", token).send(token); 
        res.status(200).json({token,user, message: 'Logged in successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { name, email, address, phone } = req.body;
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name;
        user.email = email;
        user.address = address;
        user.phone = phone;
      const updatedUser=  await user.save();
        res.status(200).json({ updatedUser,message: 'Profile updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = req.user;
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await user.comparePassword(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Old password is incorrect' });
        } 
        user.password = newPassword;
        await user.save();
        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error changing password', error });
    }
};


exports.viewProfile = async (req, res) => {
    try {
        
        // Find user by id in the request
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Send user information as response
        console.log(user);
        res.status(200).json({
           user
        });
       
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving user information' });
    }
};


exports.deleteAccount = async (req, res) => {
    try {
        const userId = req.params.userId
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
       const deletedUser= await User.remove(user)
        res.status(200).json({deletedUser, message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};


exports.makeAdmin = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.isAdmin = true;
       const updatedUser = await user.save();
        res.status(200).json({updatedUser, message: 'User made admin successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error making user admin', error });
    }
};


exports.removeAdmin = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.isAdmin = false;
       const updatedUser= await user.save();
        res.status(200).json({updatedUser, message: 'Admin privileges removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing admin privileges', error });
    }
};


exports.blockUser = async (req, res) => {
    try {
    const user = await User.findById(req.params.userId);
    if (!user) {
    return res.status(404).json({ message: 'User not found' });
    }
    user.isActive = false;
    const updatedUser = await user.save();
    res.status(200).json({updatedUser, message: 'User blocked successfully' });
    } catch (error) {
    res.status(500).json({ message: 'Error blocking user', error });
    }
    };
    
    exports.unblockUser = async (req, res) => {
    try {
    const user = await User.findById(req.params.userId);
    if (!user) {
    return res.status(404).json({ message: 'User not found' });
    }
    user.isActive = true;
    const updatedUser=  await user.save();
    res.status(200).json({updatedUser, message: 'User unblocked successfully' });
    } catch (error) {
    res.status(500).json({ message: 'Error unblocking user', error });
    }

    };