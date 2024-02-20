const express = require('express')
const {newOrder, getSingleOrder, myOrder, updateOrder, deleteOrder, getAllOrders} = require("../controller/orderController")
const { isAuthenticateduser, authorizeRoles } = require('../middleware/auth')
const router = express.Router()

router.route("/order/new").post(isAuthenticateduser, newOrder)
router.route("/order/:id").get(isAuthenticateduser , getSingleOrder)
router.route("/order/me").get(isAuthenticateduser,myOrder)

router.route("/admin/orders").get(isAuthenticateduser,authorizeRoles("admin") , getAllOrders)
router.route("/admin/order/:id").put(isAuthenticateduser,authorizeRoles("admin") , updateOrder).delete(isAuthenticateduser,authorizeRoles("admin") , deleteOrder)


module.exports = router;