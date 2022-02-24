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

export const getGroups = (req, res) => {
  Group.find().exec((err, data) => {
    if (err) {
      return res.status(400).json(err);
    }
    res.status(200).json(data);
  });
};
