import express from 'express';
import { createAttendance, getAttendence, getTfAllotedOrderController, updateAttendence } from '../controllers/attendenceController.js';


const router = express.Router();


router.post("/attendance/:orderId", createAttendance);
router.get("/attendance/:orderId", getAttendence);
router.put("/attendance/:orderId", updateAttendence);

router.get("/get-tfOrder/:id", getTfAllotedOrderController);
export default router;