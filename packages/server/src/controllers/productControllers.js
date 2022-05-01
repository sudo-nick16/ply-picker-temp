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
  let searchBySubGroup = req.query.subgroup
  let searchByGroup = req.query.group;
  let searchBybrand = req.query.brand;
  let searchByCatagory = req.query.catagory;
  let searchBySubCatagory = req.query.subcatagory;
  let searchByMaxPrice = req.query.max
    ? req.query.max
    : Number.MAX_SAFE_INTEGER;
  let searchByMinPrice = req.query.min ? req.query.min : 0;

  let filters = {};

  if (searchByCatagory) {
    filters.catagory = searchByCatagory;
  }
  if (searchBySubCatagory) {
    filters.subcatagory = searchBySubCatagory;
  }
  if (searchByGroup) {
    filters.group = searchByGroup;
  }

  if (searchBySubGroup){
    filters.subgroup = searchBySubGroup;
  }
  if (searchBySubGroup){
    filters.brand = searchBybrand;
  }

  Product.find({
    $and: [
      { product_name: { $regex: searchByProdName, $options: "$i" } },
      filters,
      { price: { $gte: searchByMinPrice, $lte: searchByMaxPrice } },
    ],
  })
    // .populate("catagory")
    // .populate("sub_catagory")
    // .populate("group")
    // .populate("sub_group")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).send({
          error: err,
        });
      }
      return res.json(data);
    });
};

export const ListRelated = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : "3";

  Product.find({ _id: { $ne: req.product }, catagory: req.product.catagory })
    .limit(limit)
    .populate("catagory")
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
      if (key === "price") {
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
    .populate("catagory")
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

export const search = (req, res, next) => { };

// only while testing
export const allProducts = async (req, res) => {
  const products = await Product.find().exec();
  console.log("all");
//   res.status(200).json(products);
  res.status(200).json(products.slice(0, 100));
};