import { Router } from "express";
const router = Router();
import { format } from 'date-fns';
import Order from '../models/order';

router.post("/saveOrders", async (req,res) => {

    try {
        const { foods, total } = req.body;
        const currentDate = new Date();
        const formattedDate = format(currentDate, 'dd MMMM yyyy, HH:mm:ss');

        await Order.create({
            userId: req.user._id,
            date: formattedDate,
            foods,
            total
        });
        res.status(201).json({ message: 'Order saved successfully' });
    } catch(error) {
        res.status(500).json({ message: 'Error saving order' });
    }
})

router.get("/pastorders", async(req,res) => {

    try {
        const userId = req.user._id;
        const orders = await Order.find({userId: userId});
        res.status(201).json(orders);
    } catch(error) {
        res.status(500).json({ message: 'Error sending order', error: error.message});
    }
})

export default router;