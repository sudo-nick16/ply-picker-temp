import Brand from "../models/Brand.js";

export const create = (req, res) => {
    const brand = new Brand(req.body)
    brand.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        res.json({ data })
    })
};


export const getBrandById = (req, res) => {
    Brand.findById(req.params.brandID)
        .then(brand => {
            if (!brand) {
                return res.status(404).send("The brand was not found")
            }
            res.send(brand)
        }).catch(err => res.status(500).send(err))
}

export const getBrand = (req, res) => {
    console.log("getBrands");
    Brand.find().exec((err, data) => {
        if (err) {
            return res.status(400).json(err);
        }
        res.status(200).json(data);
    });
};

export const remove = (req, res) => {
    Brand.findByIdAndRemove(req.params.brandID).then(doc => {
      res.send(doc)
    }).catch(err => res.status(400).send(err))
}

