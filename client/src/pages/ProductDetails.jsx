import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <img
        src={`/images/${product.image}`}
        alt={product.name}
        width="250"
      />

      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <h2>₹{product.price}</h2>
      <p>Category: {product.category}</p>
      <p>Stock: {product.stock}</p>
    </div>
  );
}

export default ProductDetails;