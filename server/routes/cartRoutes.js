const express = require("express");
const router = express.Router();


const { 
    addToCart,
    getCart,
    updateCart,
    removeFromCart
} = require("../controllers/cartController");



router.post("/add", addToCart);


router.get("/:userId", getCart);


router.put("/:userId/:productId", updateCart);


router.delete("/:userId/:productId", removeFromCart);



module.exports = router;