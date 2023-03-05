const jwt = require("jsonwebtoken");
const Cart = require("../models/Cart");
const User = require("../models/User");

exports.adminAuth = (req, res, next) => {
  // const token = req.cookies.ms2a;
  let token = req.header("Authorization");

  if (!token) {
    return res.status(403).json({message : "Access Denied"});
  }

  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length).trimLeft();
  }
  console.log("log tok",token);
  if (token) {
    jwt.verify(token, process.env.Prv_KEY, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        return res.status(401).json({ message: "Not authorized" });
      } else {
        const user = await User.findById(decodedToken.id);
        if (!user) {
          return next();
        }
        if (user.isAdmin !== true) {
          return res
            .status(401)
            .json({ message: "only admin can access this route" });
        } else {
          next();
        }
      }
    });
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" });
  }
};

exports.userAuth = (req, res, next) => {
  const token = req.cookies.ms2a;
  if (token) {
    jwt.verify(token, process.env.Prv_KEY, async (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Not authorized" });
      } else {
        const user = await User.findById(decodedToken.id);
        if (!user) {
          return next();
        }
        if (user.isAdmin !== false) {
          return res.status(401).json({ message: "Not authorized" });
        } else {
          next();
        }
      }
    });
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" });
  }
};

exports.isLogedIn = (req, res, next) => {
  const token = req.cookies.ms2a;
  if (token) {
    jwt.verify(token, process.env.Prv_KEY, async (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Not authorized" });
      } else {
        const user = await User.findById(decodedToken.id);
        if (!user) {
          return next();
        }

        req.user = user;
        next();
      }
    });
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" });
  }
};

exports.isBlocked = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.isActive) {
      return res
        .status(401)
        .json({
          message:
            "Your account has been blocked. Please contact admin for assistance",
        });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Error checking user status", error });
  }
};

exports.verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    console.log("log tok",token);

    const verified = jwt.verify(
      token,
      process.env.Prv_KEY,
      async (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ message: "Not authorized" });
        } else {
          const user = await User.findById(decodedToken.id);
          if (!user) {
            return next();
          }
          if (user.isAdmin !== true) {
            return res
              .status(401)
              .json({ message: "only admin can access this route" });
          } else {
            next();
          }
        }
      }
    );
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: "error wa33"});
  }
};
