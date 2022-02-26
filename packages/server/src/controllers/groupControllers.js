import Group from "../models/Group.js";

export const create = (req, res) => {
  const group = new Group(req.body);
  group.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({ data });
  });
};

export const getGroupById = (req, res) => {
  Group.findById(req.params.groupID)
    .then(group => {
      if (!group) {
        return res.status(404).send("The group was not found")
      }
      res.send(group)
    }).catch(err => res.status(500).send(err))
}

export const getGroups = (req, res) => {
  console.log("getGroups");
  Group.find().exec((err, data) => {
    if (err) {
      return res.status(400).json(err);
    }
    res.status(200).json(data);
  });
};
