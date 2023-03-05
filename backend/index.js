const express = require("express");
const cookieParser = require("cookie-parser");
// const { adminAuth, userAuth } = require("./middleware/auth");
const bodyParser = require("body-parser"); 

const PORT = 8000;

const app = express();

app.use(bodyParser.json());
// app.get("/admin", adminAuth, (req, res) => res.send("Admin Route"));
// app.get("/basic", userAuth, (req, res) => res.send("User Route"));

const bookRoute = require('./routes/BookRoute');
const CategoryRoute = require('./routes/CategoryRoute');
const usersRoute = require('./routes/UserRoute');
const reviewRoute = require('./routes/ReviewRoute');
const cartRoute = require('./routes/CartRoute');
const orderRoute = require('./routes/OrderRoute');

const mongoose = require("mongoose");

const cors = require("cors");

app.use(cookieParser());

app.use(cors());

app.use(express.json());
/*app.use(express.urlencoded({ extended: false }));*/


const dotenv = require("dotenv");

dotenv.config();

app.use(orderRoute);


mongoose
  .connect('mongodb+srv://amine:marco123@miniproject.6qhyg5p.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database ...");
  })
  .catch((err) => { 
    console.log(err);
  });

app.listen(PORT, async () => {
  console.log(`server up on port ${PORT}`);
});
app.use( bookRoute);
app.use( CategoryRoute);
app.use('/api/users', usersRoute);
app.use( reviewRoute);
app.use( "/cart",cartRoute);

 