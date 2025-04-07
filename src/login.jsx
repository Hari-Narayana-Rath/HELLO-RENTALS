import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const [formData, setFormData] = useState({
    name: "",
    identifier: "",
    phone: "",
    password: "",
  });
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/users");
    const users = await res.json();
    const user = users.find(
      (u) =>
        (u.identifier === formData.identifier || u.phone === formData.identifier) &&
        u.password === formData.password
    );
  
    if (user) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("currentUser", JSON.stringify(user));
    
      const email = user.identifier.toLowerCase();
    
      if (email.includes('.admin@hellor.com')) {
        navigate("/admin-portal");
      } else if (email.includes('.provider@hellor.com')) {
        navigate("/provider-portal");
      } else if (email.includes('.driver@hellor.com')) {
        navigate("/driver-portal");
      } else if (user.currentRequest === 1) {
        navigate("/current-request");
      } else {
        navigate("/app");
      }
    }    
    else {
      alert("Invalid credentials.");
    }
  };
  

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/users");
    const users = await res.json();
    const exists = users.some((u) => u.identifier === formData.identifier);
    if (exists) return alert("User already exists!");

    await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    alert("Signup successful. Please log in.");
    setShowSignup(false);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="image-container">
          <img src="logf.png" alt="Illustration" />
        </div>
        <div className="form-container">
          {showSignup ? (
            <form onSubmit={handleSignup}>
              <h2>Sign Up</h2>
              <input name="name" placeholder="Name" onChange={handleChange} required />
              <input name="identifier" placeholder="Email" onChange={handleChange} required />
              <input name="phone" placeholder="Phone Number" onChange={handleChange} required />
              <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
              <button type="submit">Sign Up</button>
              <p onClick={() => setShowSignup(false)}>Already have an account? Login</p>
            </form>
          ) : (
            <form onSubmit={handleLogin}>
              <h2>Login</h2>
              <input name="identifier" placeholder="Email or Phone" onChange={handleChange} required />
              <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
              <button type="submit">Login</button>
              <p onClick={() => setShowSignup(true)}>Create a new account</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
