import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { getFavorites, getRecentSearches } from "../lib/userData";

function DashboardPage() {
  const { user } = useAuth();

  const [favorites, setFavorites] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      if (!user?.id) return;

      try {
        setLoading(true);

        const [favoritesRows, recentRows] = await Promise.all([
          getFavorites(user.id),
          getRecentSearches(user.id),
        ]);

        setFavorites(favoritesRows.map((row) => row.ticker));
        setRecentSearches(recentRows.map((row) => row.ticker));
      } catch (err) {
        console.error("Dashboard data error:", err.message);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, [user]);

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
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "30px 20px 60px",
        }}
      >
        <div
          style={{
            backgroundColor: "#18181b",
            border: "1px solid #27272a",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "24px",
          }}
        >
          <h1 style={{ color: 'white', marginTop: 0, marginBottom: "40px" }}>Dashboard</h1>
          <p style={{ color: "#a1a1aa", margin: 0 }}>
            Welcome back{user?.email ? `, ${user.email}` : ""}.
          </p>
        </div>

        {loading ? (
          <p style={{ color: "#a1a1aa" }}>Loading your account data...</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "20px",
            }}
          >
            <div
              style={{
                backgroundColor: "#18181b",
                border: "1px solid #27272a",
                borderRadius: "16px",
                padding: "20px",
              }}
            >
              <h2 style={{ color: 'white', marginTop: 0, marginBottom: "16px" }}>
                Favorite Stocks
              </h2>

              {favorites.length === 0 ? (
                <p style={{ color: "#a1a1aa" }}>
                  You have not added any favorites yet.
                </p>
              ) : (
                favorites.map((ticker) => (
                  <Link
                    key={ticker}
                    to={`/stock/${ticker}`}
                    style={{
                      display: "block",
                      color: "white",
                      textDecoration: "none",
                      padding: "12px 0",
                      borderBottom: "1px solid #27272a",
                    }}
                  >
                    ★ {ticker}
                  </Link>
                ))
              )}
            </div>

            <div
              style={{
                backgroundColor: "#18181b",
                border: "1px solid #27272a",
                borderRadius: "16px",
                padding: "20px",
              }}
            >
            <h2 style={{ color: 'white', marginTop: 0, marginBottom: "16px" }}>
                Recent Searches
              </h2>

              {recentSearches.length === 0 ? (
                <p style={{ color: "#a1a1aa" }}>
                  No recent searches yet.
                </p>
              ) : (
                recentSearches.map((ticker) => (
                  <Link
                    key={ticker}
                    to={`/stock/${ticker}`}
                    style={{
                      display: "block",
                      color: "white",
                      textDecoration: "none",
                      padding: "12px 0",
                      borderBottom: "1px solid #27272a",
                    }}
                  >
                    {ticker}
                  </Link>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;