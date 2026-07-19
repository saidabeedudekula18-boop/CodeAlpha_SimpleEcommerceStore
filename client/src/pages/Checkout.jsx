import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const placeOrder = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      if (!user) {
        alert("Please login first");
        navigate("/login");
        return;
      }
      console.log("Cart from localStorage:", cart);
      if (cart.length === 0) {
        alert("Your cart is empty");
        return;
      }

      const totalAmount = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      console.log("User:", user);
      console.log("Cart:", cart);
      console.log("Order Data:", {
        user: user._id,
        products: cart.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
        totalAmount,
      });

      const response = await fetch(
        "http://127.0.0.1:5000/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: user._id,
            products: cart.map((item) => ({
              product: item._id,
              quantity: item.quantity,
            })),
            address: "Hyderabad",
            totalAmount,
          }),
        }
      );

      const data = await response.json();

      alert(data.message);

      if (response.ok) {
        localStorage.removeItem("cart");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert("Order Failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>💳 Checkout</h1>

      <h3>Ready to place your order?</h3>

      <button onClick={placeOrder}>
        📦 Place Order
      </button>
    </div>
  );
}

export default Checkout;