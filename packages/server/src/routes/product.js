import { Router } from "express";

const router = Router();
import {
  create,
  productId,
  remove,
  update,
  list,
  ListRelated,
  listBySearch,
  // getProduct,
  // allProducts,
} from "../controllers/productControllers.js";

router.post(
  "/products/create",
  //  requireSignin, isAuth, isAdmin,
  create
);

// router.get("/products", (req, res) => {
//   console.log("all products");
//   allProducts(req, res);
// });

// router.get("/products/:p_id", (req, res) => {
//   console.log("one product");
//   getProduct(req, res);
// });

router.get("/products/:productId", (req, res) => {
  res.send(req.product);
  // res.json({
  //     product: req.product
  // })
});

router.post("/products/by/search", listBySearch);

router.get("/products", list);
router.get("/products/related/:productId", ListRelated);

// router.delete("/products/:productId/:userId" ,
// // requireSignin , isAuth , isAdmin ,
//  remove)
router.delete(
  "/products/:productId",
  // requireSignin , isAuth , isAdmin ,
  remove
);
// router.put("/products/:productId/:userId" ,
// // requireSignin , isAuth , isAdmin ,
// update)
router.put(
  "/products/:productId",
  // requireSignin , isAuth , isAdmin ,
  update
);

router.param("productId", productId);

export default router;
