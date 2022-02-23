import Category from "../models/Category.js";

export const create = (req, res) => {
    const category = new Category(req.body);
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({ data });
    });
};


export const getCategories = (req,res) => {
    Category.find().exec((err , data) => {
        if(err){
            return res.status(404).json(err)
        }
        res.status(200).json(data)
    })
}
