import { Router } from "express";

const router = Router();
import {
  productId,
  list,
  ListRelated,
  listBySearch,
  allProducts,
} from "../controllers/productControllers.js";

// router.post(
//   "/products/create",
//   //  requireSignin, isAuth, isAdmin,
//   create
// );
// to be implemented in admin panel

router.get("/", allProducts);

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
// router.delete(
//   "/products/:productId",
//   // requireSignin , isAuth , isAdmin ,
//   remove
// );
// to be implemented in admin panel
// router.put("/products/:productId/:userId" ,
// // requireSignin , isAuth , isAdmin ,
// update)
// router.put(
//   "/products/:productId",
//   // requireSignin , isAuth , isAdmin ,
//   update
// );
// to be implemented in admin panel
router.param("productId", productId);

export default router;
