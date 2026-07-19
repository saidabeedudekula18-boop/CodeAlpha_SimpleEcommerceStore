import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
      e.preventDefault();

      try {
        const response = await fetch("http://127.0.0.1:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
    });

    const data = await response.json();

    alert(data.message);

    if (response.ok) {
      // Save Token
      localStorage.setItem("token", data.token);

      // Save User
      localStorage.setItem("user", JSON.stringify(data.user));

      console.log(data);

      // Redirect
      window.location.href = "/";
    }
  } catch (error) {
    console.log(error);
    alert("Login Failed");
    }
 };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🔐 Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;