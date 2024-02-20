import express from "express";
import {
  isAdmin,
  isTCenter,
  requireSignIn,
} from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";
import {
  createItemController,
  deleteItemController,
  getItemController,
  getSingleItemController,
  getSingleItemControllerId,
  itemPhotoController,
  updataItemController,
} from "../controllers/tItemController.js";

const router = express.Router();

//create food
router.post(
  "/create-item",
  // requireSignIn,
  // isAdmin,
  formidable(),

  createItemController
);
//get all item
router.get(
  "/get-item",
  //requireSignIn, isAdmin,
  getItemController
);
//get single item by id
router.get("/get-singleItemById/:id", getSingleItemControllerId);
//get single item by slug
router.get("/get-singleItem/:slug", getSingleItemController);

//get single item
router.get("/get-photo/:id", itemPhotoController);

//this is another router for getting all images in one time

//delete item
router.delete("/delete-item/:id", deleteItemController);
//update item
router.put("/update-item/:id", formidable(), updataItemController);

// //search order
// router.get("/searchOrder/:orderId", searchOrderController);

export default router;
