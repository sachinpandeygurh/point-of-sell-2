import express from "express";

import {
  createTfc,
  getAllotedTiffin,
} from "../controllers/tfcOrderController.js";
import {
  createdelOrderController,
  getAllotedDelOrderByIdController,
  getDelOrdersByBuser,
  getDetails,
  getTCDetails,
  getUserDetails,
} from "../controllers/delOrderController.js";

const router = express.Router();
// for admin order to tiffin center farwarding
router.post("/tefor", createTfc);

/// for admin roder to delivery boy farwarding
router.post("/delor", createdelOrderController);

//get all the orders
router.get("/finddelbyid/:delId", getAllotedDelOrderByIdController);
router.get("/findtfcbyid/:centerId", getAllotedTiffin);
router.get("/getod/:buser", getDelOrdersByBuser);

router.get("/:orderId", getDetails);

router.get("/gettc/:orderId", getTCDetails);

router.get("/getud/:centerId", getUserDetails);

export default router;
