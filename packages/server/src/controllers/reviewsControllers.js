export const getReviews = (req, res) => {

}

export const addReview = (req, res) => {
    const { _id } = req.user;
    const { review, rating, productId } = req.body;
    
    
}