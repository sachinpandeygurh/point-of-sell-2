import express from "express";

import {
  deleteCartController,
  getCartController,
  PostCartController,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/add-cart", PostCartController);
router.get("/get-cart/:id", getCartController);
router.delete("/delete-cart/:id", deleteCartController);

export default router;
