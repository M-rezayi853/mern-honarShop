import asyncHandler from 'express-async-handler';

import Order from '../models/orderModel.js';

// @des     Create order
// @route     POST /api/orders
// @access     Private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress, 
        paymentMethod, 
        taxPrice, 
        shippingPrice, 
        totalPrice, 
        itemsPrice
    } = req.body;

    if(orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    } else {
        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            taxPrice,
            shippingPrice,
            totalPrice,
            itemsPrice
        });

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    }
});

export { addOrderItems };