import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { supabase } from "../lib/supabase";

function SignupPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleSignup(e) {
    e.preventDefault();
    setFormLoading(true);
    setError("");
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setFormLoading(false);
      return;
    }

    setFormLoading(false);
    setMessage("Account created. You can now log in.");
    navigate("/login");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#09090b",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Navbar />

      <div
        style={{
          maxWidth: "420px",
          margin: "60px auto",
          padding: "24px",
          backgroundColor: "#18181b",
          border: "1px solid #27272a",
          borderRadius: "16px",
        }}
      >
        <h1 style={{ color: 'white', marginTop: 0 }}>Get Started</h1>
        <p style={{ color: "#a1a1aa", marginBottom: "20px" }}>
          Create an account for saved favorites and watchlists.
        </p>

        <form onSubmit={handleSignup}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "8px" }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #27272a",
                backgroundColor: "#09090b",
                color: "white",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "8px" }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Choose a password"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #27272a",
                backgroundColor: "#09090b",
                color: "white",
                boxSizing: "border-box",
              }}
            />
          </div>

          {error && (
            <p style={{ color: "#f87171", marginBottom: "16px" }}>
              {error}
            </p>
          )}

          {message && (
            <p style={{ color: "#4ade80", marginBottom: "16px" }}>
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={formLoading}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "none",
              backgroundColor: "#2563eb",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            {formLoading ? "Creating account..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;