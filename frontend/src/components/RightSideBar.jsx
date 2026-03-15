import { Link } from "react-router-dom";

function RightSidebar({ favorites, recentSearches }) {
  return (
    <aside
      style={{
        backgroundColor: "#18181b",
        border: "1px solid #27272a",
        borderRadius: "16px",
        padding: "20px",
        height: "fit-content",
      }}
    >
      <div style={{ marginBottom: "28px" }}>
        <h3 style={{ color: "white", marginTop: 0, marginBottom: "14px" }}>
          Favorite Stocks
        </h3>

        {favorites.length === 0 ? (
          <p style={{ color: "#a1a1aa", margin: 0 }}>No favorites yet.</p>
        ) : (
          favorites.map((ticker) => (
            <Link
              key={ticker}
              to={`/stock/${ticker}`}
              style={{
                display: "block",
                color: "white",
                textDecoration: "none",
                padding: "10px 0",
                borderBottom: "1px solid #27272a",
              }}
            >
              ★ {ticker}
            </Link>
          ))
        )}
      </div>

      <div>
        <h3 style={{ color: "white", marginTop: 0, marginBottom: "14px" }}>
          Recent Searches
        </h3>

        {recentSearches.length === 0 ? (
          <p style={{ color: "#a1a1aa", margin: 0 }}>No recent searches yet.</p>
        ) : (
          recentSearches.map((ticker) => (
            <Link
              key={ticker}
              to={`/stock/${ticker}`}
              style={{
                display: "block",
                color: "white",
                textDecoration: "none",
                padding: "10px 0",
                borderBottom: "1px solid #27272a",
              }}
            >
              {ticker}
            </Link>
          ))
        )}
      </div>
    </aside>
  );
}

export default RightSidebar;