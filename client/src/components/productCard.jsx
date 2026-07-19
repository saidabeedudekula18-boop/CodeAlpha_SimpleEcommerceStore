import { Link } from "react-router-dom";

function ProductCard({ product, addToCart, addToWishlist }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "15px",
        width: "220px",
        textAlign: "center",
      }}
    >
      <Link
        to={`/product/${product._id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <img
          src={`/images/${product.image}`}
          alt={product.name}
          width="150"
          height="150"
        />

        <h2>{product.name}</h2>
      </Link>

      <p>{product.description}</p>
      <p>₹{product.price}</p>
      <p>Category: {product.category}</p>

      <button onClick={() => addToCart(product)}>
        Add to Cart
      </button>

      <button
        onClick={() => addToWishlist(product)}
        style={{ marginLeft: "10px" }}
      >
        ❤️ Wishlist
      </button>
    </div>
  );
}

export default ProductCard;