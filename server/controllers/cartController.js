const Cart = require("../models/Cart");


// Add Product To Cart
const addToCart = async (req, res) => {

    try {

        const { user, product, quantity } = req.body;

        let cart = await Cart.findOne({ user });


        if (!cart) {

            cart = new Cart({
                user,
                products: [
                    {
                        product,
                        quantity
                    }
                ]
            });

        } else {

            const existingProduct = cart.products.find(
                item => item.product.toString() === product
            );


            if (existingProduct) {
                existingProduct.quantity += quantity;
            } 
            else {
                cart.products.push({
                    product,
                    quantity
                });
            }
        }


        await cart.save();


        res.status(201).json({
            message: "Product added to cart",
            cart
        });


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



// Get Cart
const getCart = async (req, res) => {

    try {

        const cart = await Cart.findOne({
            user: req.params.userId
        }).populate("products.product");


        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }


        res.status(200).json(cart);


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

//Update Cart
const updateCart = async (req, res) => {

    try {

        const { userId, productId } = req.params;
        const { quantity } = req.body;


        const cart = await Cart.findOne({
            user: userId
        });


        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }


        const product = cart.products.find(
            item => item.product.toString() === productId
        );


        if (!product) {
            return res.status(404).json({
                message: "Product not found in cart"
            });
        }


        product.quantity = quantity;


        await cart.save();


        res.status(200).json({
            message: "Cart updated successfully",
            cart
        });


    } catch(error) {

        res.status(500).json({
            message: error.message
        });

    }

};

//Remove Cart
const removeFromCart = async (req, res) => {

    try {

        const { userId, productId } = req.params;


        const cart = await Cart.findOne({
            user: userId
        });


        if (!cart) {
            return res.status(404).json({
                message:"Cart not found"
            });
        }


        cart.products = cart.products.filter(
            item => item.product.toString() !== productId
        );


        await cart.save();


        res.status(200).json({
            message:"Product removed from cart",
            cart
        });


    } catch(error) {

        res.status(500).json({
            message:error.message
        });

    }

};

module.exports = {
    addToCart,
    getCart,
    updateCart,
    removeFromCart
};