import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMovers, getHeadlines } from "../api.js";

function MarketOverview() {
  const [topMovers, setTopMovers] = useState([]);
  const [highImpactEvents, setHighImpactEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        // Fetch movers and headlines for all tickers in parallel
        const [moversRes, aaplRes, tslaRes, nvdaRes, msftRes] = await Promise.all([
          getMovers("AAPL,TSLA,NVDA,MSFT"),
          getHeadlines("AAPL", "1wk"),
          getHeadlines("TSLA", "1wk"),
          getHeadlines("NVDA", "1wk"),
          getHeadlines("MSFT", "1wk"),
        ]);

        setTopMovers(moversRes);

        // Combine all headlines, sort by confidence, take top 5
        const allHeadlines = [
          ...aaplRes.map(h => ({ ...h, ticker: "AAPL" })),
          ...tslaRes.map(h => ({ ...h, ticker: "TSLA" })),
          ...nvdaRes.map(h => ({ ...h, ticker: "NVDA" })),
          ...msftRes.map(h => ({ ...h, ticker: "MSFT" })),
        ]
          .filter(h => h.sentiment !== "neutral") // only impactful ones
          .sort((a, b) => b.confidence - a.confidence) // highest confidence first
          .slice(0, 5) // top 5 only
          .map(h => ({
            title: h.title,
            ticker: h.ticker,
            impact: h.confidence > 0.85 ? "High" : h.confidence > 0.70 ? "Medium" : "Low",
            sentiment: h.sentiment.charAt(0).toUpperCase() + h.sentiment.slice(1),
          }));

        setHighImpactEvents(allHeadlines);

      } catch (err) {
        console.error("MarketOverview error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <section style={{ padding: "40px 20px", maxWidth: "1200px", margin: "0 auto" }}>
        <h2 style={{ color: "white", fontSize: "32px" }}>Market Overview</h2>
        <p style={{ color: "#a1a1aa" }}>Loading market data...</p>
      </section>
    );
  }

  return (
    <section
      style={{
        padding: "40px 20px 20px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <h2 style={{ color: "white", fontSize: "32px", marginBottom: "24px" }}>
        Market Overview
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "20px",
        }}
      >
        {/* Top Movers */}
        <div
          style={{
            backgroundColor: "#18181b",
            border: "1px solid #27272a",
            borderRadius: "16px",
            padding: "20px",
          }}
        >
          <h3 style={{ color: "white", marginTop: 0, marginBottom: "16px" }}>
            Highest Moving Stocks
          </h3>

          {topMovers.map((stock) => (
            <Link
              key={stock.ticker}
              to={`/stock/${stock.ticker}`}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "14px 0",
                borderBottom: "1px solid #27272a",
                textDecoration: "none",
                color: "white",
              }}
            >
              <div>
                <p style={{ margin: 0, fontWeight: "600" }}>{stock.ticker}</p>
                <p style={{ margin: "4px 0 0 0", color: "#a1a1aa", fontSize: "14px" }}>
                  {stock.name}
                </p>
              </div>

              <div style={{ textAlign: "right" }}>
                <p style={{ margin: 0 }}>${stock.price}</p>
                <p
                  style={{
                    margin: "4px 0 0 0",
                    color: stock.change.startsWith("+") ? "#4ade80" : "#f87171",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  {stock.change}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* High Impact Events */}
        <div
          style={{
            backgroundColor: "#18181b",
            border: "1px solid #27272a",
            borderRadius: "16px",
            padding: "20px",
          }}
        >
          <h3 style={{ color: "white", marginTop: 0, marginBottom: "16px" }}>
            Highest Impact Events
          </h3>

          {highImpactEvents.length === 0 ? (
            <p style={{ color: "#a1a1aa" }}>No high impact events found.</p>
          ) : (
            highImpactEvents.map((event, index) => (
              <div
                key={index}
                style={{ padding: "14px 0", borderBottom: "1px solid #27272a" }}
              >
                <p style={{ margin: "0 0 8px 0", fontWeight: "600", color: "white" }}>
                  {event.title}
                </p>
                <p style={{ margin: 0, color: "#a1a1aa", fontSize: "14px" }}>
                  {event.ticker} • Impact: {event.impact} • Sentiment:{" "}
                  <span
                    style={{
                      color: event.sentiment === "Positive" ? "#4ade80" : "#f87171",
                    }}
                  >
                    {event.sentiment}
                  </span>
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default MarketOverview;