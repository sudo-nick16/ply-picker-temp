import SubGroup from "../models/SubGroup.js";

export const create = (req, res) => {
    const subGroup = new SubGroup(req.body)
    subGroup.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        res.json({ data })
    })
};


export const getSubGroupById = (req, res) => {
    SubGroup.findById(req.params.subGroupID)
        .then(subGroup => {
            if (!subGroup) {
                return res.status(404).send("The subgroup was not found")
            }
            res.send(subGroup)
        }).catch(err => res.status(500).send(err))
}

export const getSubGroups = (req, res) => {
    console.log("getSubGroups");
    SubGroup.find().exec((err, data) => {
        if (err) {
            return res.status(400).json(err);
        }
        res.status(200).json(data);
    });
};

export const remove = (req, res) => {
    SubGroup.findByIdAndRemove(req.params.subGroupID).then(doc => {
      res.send(doc)
    }).catch(err => res.status(400).send(err))
  }