import Product from "../models/Product.js";
import _ from "lodash";

export const create = (req, res) => {
  const product = new Product(req.body);

  product.save((err, result) => {
    if (err) {
      console.log("PRODUCT CREATE ERROR ", err);
      return res.status(400).json({
        error: err,
      });
    }
    res.json(result);
  });
  /* }); */
};

export const productId = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      console.log("PRODUCT CREATE ERROR ", err);
      return res.status(400).json({
        error: "something went wrong",
      });
    }
    req.product = product;
    next();
  });
};

export const remove = (req, res, id) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: "something went wrong",
      });
    }

    res.json({
      deletedProduct,
      message: "product has deleted successfully",
    });
  });
};

export const update = (req, res) => {
  let product = req.product;
  product = _.extend(product);

  product.save((err, result) => {
    if (err) {
      console.log("PRODUCT CREATE ERROR ", err);
      return res.status(400).json({
        error: "something went wrong",
      });
    }
    res.json(result);
  });
};

export const list = (req, res) => {
  let order = req.query.order ? req.query.order : "desc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit
    ? parseInt(req.query.limit)
    : Number.MAX_SAFE_INTEGER;
  let searchByProdName = req.query.name ? req.query.name : "";
  let searchByGroup = req.query.group;
  let searchByCategory = req.query.category;
  let searchBySubCategory = req.query.subcategory;
  let searchByMaxPrice = req.query.max
    ? req.query.max
    : Number.MAX_SAFE_INTEGER;
  let searchByMinPrice = req.query.min ? req.query.min : 0;

  let filters = {};

  if (searchByCategory) {
    filters.Category = searchByCategory;
  }
  if (searchBySubCategory) {
    filters.Sub_Category = searchBySubCategory;
  }
  if (searchByGroup) {
    filters.Group = searchByGroup;
  }

  Product.find({
    $and: [
      { Product_Name: { $regex: searchByProdName, $options: "$i" } },
      filters,
      { Product_Price: { $gte: searchByMinPrice, $lte: searchByMaxPrice } },
    ],
  })
    .populate("Category")
    .populate("Sub_Category")
    .populate("Group")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        res.status(400).json({
          error: err,
        });
      }
      return res.json(data);
    });
};

export const ListRelated = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : "3";

  Product.find({ _id: { $ne: req.product }, Category: req.product.Category })
    .limit(limit)
    .populate("Category")
    .exec((err, products) => {
      if (err) {
        res.status(400).json({
          error: "product not found",
        });
      }

      res.json(products);
    });
};

export const listBySearch = (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "Product_Price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Product.find(findArgs)
    .populate("Category")
    .sort([[sortBy, order]])
    /* .skip(skip) */
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }
      res.json({
        size: data.length,
        data,
      });
    });
};

export const search = (req, res, next) => {};
