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

export const getCategoryByID = (req, res) =>{
    Category.findById(req.params.categoryID)
    .then(category=>{
        if (!category){
            return res.status(400).send("Category does not exists")
        }
        res.send(category)
    })
    .catch(err=>res.status(500).send(err))
}

export const getCategories = (req,res) => {
    Category.find().exec((err , data) => {
        if(err){
            return res.status(404).json(err)
        }
        res.status(200).json(data)
    })
}

export const remove = (req, res) => {
    Category.findByIdAndRemove(req.params.categoryID).then(doc => {
      res.send(doc)
    }).catch(err => res.status(400).send(err))
  }