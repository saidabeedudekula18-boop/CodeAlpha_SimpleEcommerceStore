import { Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Checkout from "./pages/Checkout";
import Cart from "./pages/Cart";

function App() {
  const [cart, setCart] = useState(() => {
     return JSON.parse(localStorage.getItem("cart")) || [];
  });
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Add to Cart
  const addToCart = (product) => {
    const existing = cart.find((item) => item._id === product._id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const addToWishlist = (product) => {
  const exists = wishlist.find((item) => item._id === product._id);

    if (!exists) {
      setWishlist([...wishlist, product]);
      }
    };

    const removeFromWishlist = (id) => {
  setWishlist(wishlist.filter((item) => item._id !== id));
    };

  // Increase Quantity
  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease Quantity
  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((item) =>
          item._id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Total Price
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    console.log("Cart Updated:", cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

 return (
  <div>
    <Navbar />

    <Routes>
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <>
            <ProductList
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            search={search}
            category={category}
            />

            <hr />

            <h2>🛍️ Shopping Cart</h2>

            {cart.length === 0 ? (
              <p>Cart is Empty</p>
            ) : (
              <>
              <>
                <h2>Cart Items: {cart.length}</h2>

                <input
                  type="text"
                  placeholder="🔍 Search Products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    padding: "10px",
                    width: "300px",
                    marginBottom: "20px",
                    fontSize: "16px",
                  }}
                />

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{
                    marginLeft: "20px",
                    padding: "10px",
                    fontSize: "16px",
                  }}
                >
                  <option value="All">All Categories</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Books">Books</option>
                </select>

                <ProductList
                  addToCart={addToCart}
                  addToWishlist={addToWishlist}
                  search={search}
                  category={category}
                />

                {/* Shopping Cart & Wishlist code... */}
              </>
                {cart.map((item) => (
                  <div key={item._id}>
                    <h3>{item.name}</h3>
                    <p>Price: ₹{item.price}</p>

                    <div>
                      <button onClick={() => decreaseQuantity(item._id)}>
                        -
                      </button>

                      <span style={{ margin: "0 10px" }}>
                        {item.quantity}
                      </span>

                      <button onClick={() => increaseQuantity(item._id)}>
                        +
                      </button>
                    </div>

                    <p>Subtotal: ₹{item.price * item.quantity}</p>
                    <hr />
                  </div>
                ))}

                <h2>Total: ₹{total}</h2>
                <br />

                <Link to="/checkout">
                  <button>
                    💳 Checkout
                  </button>
                </Link>
                </>
                 )}
                <hr />

                <h2>❤️ Wishlist ({wishlist.length})</h2>

                {wishlist.length === 0 ? (
                  <p>No Wishlist Items</p>
                ) : (
                  wishlist.map((item) => (
                   <div key={item._id}>
                     <h3>{item.name}</h3>
                     <p>₹{item.price}</p>

                     <button onClick={() => removeFromWishlist(item._id)}>
                        ❌ Remove
                     </button>

                     <hr />
                  </div>
                   ))
                 )}
          </>
        }
      />

      <Route path="/product/:id" element={<ProductDetails />} />
      <Route
        path="/cart"
        element={
          <Cart
            cart={cart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            total={total}
          />
        }
      />
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
    </Routes>
  </div>
);
}

export default App;