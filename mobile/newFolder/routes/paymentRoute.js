import express from "express";
import {
  allOrderSearch,
  getAlltcsController,
  getSingleOrderById,
  getSingleSubsController,
  getSingletcsController,
  razorPayCreatOrderController,
  razorPayKeyController,
  razorPayListOrderController,
  razorPayOrderController,
  tcCreateOrderController,
  tcPayOrderController,
} from "../controllers/paymentController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//orders
router.get("/get-razorpay-key", razorPayKeyController);
router.post("/create-order", razorPayCreatOrderController);

//payment
router.post("/pay-order", razorPayOrderController);
//payment
router.get("/list-orders", razorPayListOrderController);

// get single order by id
router.get("/single-order/:id", getSingleOrderById);

//this below mentioned all routes for tiffin center payment subscription

router.post("/create-subs", tcCreateOrderController);
router.post("/pay-subs", tcPayOrderController);

// get all subs
router.get("/getall-subs", getAlltcsController);
// get single subs
router.get("/getS-subs/:param", getSingleSubsController);
// searching in order page
router.get("/get-searchOrder/:param", allOrderSearch);


//singletcsubscription
router.get("/get-single-Subs/:tiffinId", getSingletcsController);
export default router;
