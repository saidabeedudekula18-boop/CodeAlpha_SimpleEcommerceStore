const Order = require("../models/Order");


const createOrder = async (req, res) => {
    try {

        const { user, products, address, totalAmount } = req.body;


        const order = await Order.create({
            user,
            products,
            address,
            totalAmount
        });


        res.status(201).json({
            message: "Order created successfully",
            order
        });


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


module.exports = {
    createOrder
};