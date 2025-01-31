import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // Import CSS file for styles

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Function to handle registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Create user on Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      alert("Registration successful! Please complete your profile.");
      
      // Redirect to verify-waiting page
      navigate("/verification", { state: { email } });
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("This email is already registered but not yet approved. Please sign in.");
        alert("Please complete your profile.");
        navigate("/verification", { state: { email } });
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div className="register-container">
      <div className="form-wrapper">
        <h2 className="form-title">Create an Account</h2>
        <form className="register-form" onSubmit={handleRegister}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="register-input"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="register-input"
          />
          <button type="submit" className="register-button">Register</button>
        </form>
        {error && <p className="register-error">{error}</p>}
        <p className="register-footer">
          Already have an account? <a href="/signin">Sign In</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
