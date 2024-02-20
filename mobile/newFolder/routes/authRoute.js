import express from "express";
import {
  registerController,
  loginController,
  forgotPasswordController,
  addTCenterController,
  updateProfileController,
  getAllCustomerController,
  getAllTCenterController,
  deleteUserController,
  resetPassword,
  getOrdersController,
  addDelBoyController,
  getAllDelBoyController,
  updatedelController,
  deletedelController,
  getSingleUserController,
  getAllTCenterControllerByID,
  updateTiffinCenterController,
  deleteTiffinCenterController,
  getSingleTiffinController,
  getSingleDelSearchController,
} from "../controllers/authController.js";

//router object
const router = express.Router();

// user register \\ method post
router.post("/register", registerController);

// delete user  || method delete
router.delete(
  "/delete-user/:id",

  deleteUserController
);
// Tiffin Center Register // mehtod post

router.post("/add-tcenter", addTCenterController);

//LOGIN || POST
router.post("/login", loginController);

//Forgot Password || POST
router.post("/forget-password", forgotPasswordController);

//reset password
router.post("/resetpassword", resetPassword);
//update profile
router.put(
  "/update-profile",
  // requireSignIn,
  updateProfileController
);
// update delivery boy
router.put(
  "/update-del/:_id",
  // requireSignIn,
  updatedelController
);

//delete delivery boy
router.delete("/delete-del/:_id", deletedelController);

//orders
router.get("/orders", getOrdersController);

// get single orders
router.get("/getSingleOrder");
router.get(
  "/get-alltcenter",

  getAllTCenterController
);

//get all customer details
router.get(
  "/get-allcustomer",

  getAllCustomerController
);

//tiffin
// Tiffin Center Register // mehtod post

router.post("/add-tcenter", addTCenterController);

/* getallTiffinCnetr */

router.get("/get-alltcenter", getAllTCenterController);

/* get tc by id */
router.get(
  "/get-alltcenter",

  getAllTCenterController
);

router.get("/get-tc/:id", getAllTCenterControllerByID);

/* update tiffin center */

router.put("/update-tc/:_id", updateTiffinCenterController);

/* delete tiffin center */

router.delete("/delete-tc/:_id", deleteTiffinCenterController);

//tiffin

router.post("/add-delboy", addDelBoyController);
router.get("/get-delboy", getAllDelBoyController);
router.get("/get-sUser/:id", getSingleUserController);

// serching for tiffin center
router.get("/getS-search/:param", getSingleTiffinController);
// searching for delivery boy
router.get("/get-searchDel/:param", getSingleDelSearchController);
export default router;
