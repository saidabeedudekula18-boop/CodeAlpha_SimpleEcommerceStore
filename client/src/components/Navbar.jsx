import { Link } from "react-router-dom";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        background: "#f5f5f5",
      }}
    >
      <h2>🛒 Simple Store</h2>

      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>

        {user ? (
          <>
            <span>👋 Welcome, {user.name}</span>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/login";
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;