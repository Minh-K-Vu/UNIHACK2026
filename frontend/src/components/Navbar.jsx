import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { user, authLoading, signOut } = useAuth();

  function handleSearch(e) {
    e.preventDefault();

    if (!search.trim()) return;

    navigate(`/stock/${search.trim().toUpperCase()}`);
    setSearch("");
  }

  async function handleLogout() {
    await signOut();
    navigate("/");
  }

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "20px",
        padding: "20px",
        borderBottom: "1px solid #27272a",
        backgroundColor: "#09090b",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <Link
        to="/"
        style={{
          color: "white",
          textDecoration: "none",
          fontSize: "24px",
          fontWeight: "700",
        }}
      >
        Sentra AI
      </Link>

      <form
        onSubmit={handleSearch}
        style={{
          flex: 1,
          maxWidth: "500px",
          display: "flex",
          gap: "10px",
        }}
      >
        <input
          type="text"
          placeholder="Search ticker e.g. AAPL"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            backgroundColor: "#18181b",
            color: "white",
            border: "1px solid #27272a",
            borderRadius: "10px",
            padding: "10px 14px",
            fontSize: "16px",
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "10px",
            padding: "10px 16px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Search
        </button>
      </form>

      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        {authLoading ? (
          <span style={{ color: "#a1a1aa" }}>Loading...</span>
        ) : user ? (
          <>
          <Link
          to="/dashboard"
          style={{
          color: "#d4d4d8",
          textDecoration: "none",
          padding: "10px 14px",
          }}
          >
            Dashboard
          </Link>
          <span style={{ color: "#d4d4d8", fontSize: "14px" }}>
          {user.email}
          </span>
          <button
          onClick={handleLogout}
          style={{
          backgroundColor: "white",
          color: "#09090b",
          border: "none",
          borderRadius: "10px",
          padding: "10px 14px",
          fontWeight: "600",
          cursor: "pointer",
          }}
        >
        Logout
        </button>
        </>
        ) : (
          <>
            <Link
              to="/login"
              style={{
                color: "#d4d4d8",
                textDecoration: "none",
                padding: "10px 14px",
              }}
            >
              Login
            </Link>

            <Link
              to="/signup"
              style={{
                backgroundColor: "white",
                color: "#09090b",
                textDecoration: "none",
                padding: "10px 14px",
                borderRadius: "10px",
                fontWeight: "600",
              }}
            >
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;