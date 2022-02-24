import SubCategory from "../models/SubCategory.js";

export const create = (req, res)=>{
    const subCategory = new SubCategory(req.body)
    subCategory.save((err, data)=>{
        if (err){
            return res.status(400).json({
                error:err
            })
        }
        res.json({data})
    })
}

export const getSubCategories = (req, res) =>{
    SubCategory.find().exec((err, data)=>{
        if (err){
            return res.status(404).json(err)
        }
        res.status(200).json(data)
    })
}