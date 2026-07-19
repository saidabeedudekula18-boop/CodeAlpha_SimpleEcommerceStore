import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function ProductList({ addToCart, addToWishlist, search, category }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);
    const filteredProducts = products.filter((product) => {
  const matchSearch = product.name
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchCategory =
    category === "All" || product.category === category;

  return matchSearch && matchCategory;
   });
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center",
      }}
    >
      {filteredProducts.map((product) => (
  <ProductCard
    key={product._id}
    product={product}
    addToCart={addToCart}
    addToWishlist={addToWishlist}
  />
))}
    </div>
  );
}

export default ProductList;