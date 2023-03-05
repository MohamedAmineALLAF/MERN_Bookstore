const Review = require('../models/Review');

exports.createReview = async (req, res) =>{
    try {
        const userId = req.user.id;
        if (!userId) return res.status(401).send('Unauthorized');
        const existingReview = await Review.findOne({ user: userId, book: req.params.bookId });
        if (existingReview) return res.status(400).send({ message: 'User already submitted a review for this book' });
        const newReview = new Review({
            user: userId,
            book: req.params.bookId,
            rating: req.body.rating,
            review: req.body.review
        });
        await Review.create(newReview);
        res.status(201).send({message: 'Review created successfully'});
    } catch (error) {
        res.status(500).send({ message: 'Error creating review' });
    }
}

exports.getReviewsByBook = async (req, res) => {
    try {
        const bookId = req.params.bookId;
        const reviews = await Review.find({ book: bookId }).populate('user');
        res.status(200).send(reviews);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving reviews' });
    }
}


exports.getAverageRating = async (req, res) => {
    try {
        const bookId = req.params.bookId;
        const reviews = await Review.find({ book: bookId });
        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        const averageRating = totalRating / reviews.length;
        res.status(200).send({ averageRating });
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving average rating' });
    }
}