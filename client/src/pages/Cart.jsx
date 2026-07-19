function Cart({
  cart,
  increaseQuantity,
  decreaseQuantity,
  total,
}) {
  return (
    <div style={{ padding: "20px" }}>
      <h1>🛒 Shopping Cart</h1>

      {cart.length === 0 ? (
        <p>Cart is Empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item._id}>
              <h3>{item.name}</h3>

              <p>₹{item.price}</p>

              <button
                onClick={() => decreaseQuantity(item._id)}
              >
                -
              </button>

              <span style={{ margin: "0 10px" }}>
                {item.quantity}
              </span>

              <button
                onClick={() => increaseQuantity(item._id)}
              >
                +
              </button>

              <p>
                Subtotal ₹{item.price * item.quantity}
              </p>

              <hr />
            </div>
          ))}

          <h2>Total ₹{total}</h2>
        </>
      )}
    </div>
  );
}

export default Cart;