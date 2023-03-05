const Cart = require('../models/Cart');


exports.addBookToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const bookId = req.params.bookId;
        const quantity = req.body.quantity;
        // Find the cart of the user
        const cart = await Cart.findOne({user: userId});
        console.log(cart);

        // Check if the book is already in the cart
        const index = cart.books.findIndex(book => book.book.toString() === bookId);
        
        if(index !== -1) {
            // Update the quantity of the book if it's already in the cart
            cart.books[index].quantity += quantity;

        } else {
            // Add the book to the cart if it's not already in the cart
            cart.books.push({book: bookId, quantity: quantity});
        }
         
        // Save the updated cart
        await cart.save();
        
        res.status(200).send({message: 'Book added to cart successfully'});
    } catch (error) {
        res.status(500).send({ message: 'Error adding book to cart' });
    }
}


exports.removeBookFromCart = async (req, res) => {
    try {
        // Find the cart associated with the user
        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        // Check if the book is already in the cart
        const bookIndex = cart.books.findIndex(book => book.book.toString() === req.params.bookId);
        if (bookIndex === -1) return res.status(404).json({ message: 'Book not found in cart' });

        // Remove the book from the cart
        cart.books.splice(bookIndex, 1);
        await cart.save();

        return res.status(200).json({ message: 'Book removed from cart' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

exports.updateBookQuantity = async (req, res) => {
    try {
        const { bookId, quantity } = req.body;
        const userId = req.user._id;
        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        // check if the book is already in the cart
        const bookIndex = cart.books.findIndex(b => b.book.toString() === bookId);
        if (bookIndex === -1) return res.status(404).json({ message: 'Book not found in cart' });

        cart.books[bookIndex].quantity = quantity;
        await cart.save();
        return res.json({ message: 'Quantity updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}


exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('books.book');
        console.log(cart.books);
        res.json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


exports.clearCart =async (req, res) => {
    try{
        const cart =await Cart.findOne({ user: req.user._id })
        if (!cart) return res.status(404).json({ error: 'Cart not found' });

   cart.books=[]
   cart.total_price=0
   await cart.save();
   return res.status(200).json({ message: 'Cart cleared' });

    }catch(err){
        res.status(500).json({ error: 'Error clearing cart' });
    }
  
}


exports.calculateTotalPrice = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('books.book');
        let totalPrice = 0;
        cart.books.forEach(book => {
            totalPrice += book.book.price * book.quantity;
        });
        cart.total_price = totalPrice;
        await cart.save();
        return res.status(200).json({ total_price: totalPrice });
    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
}
