const Product = require("../models/Product");

// Get All Products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Get Single Product
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({
            message: "Product Added Successfully",
            product
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
  getProducts,
  createProduct,
  getProductById,
};