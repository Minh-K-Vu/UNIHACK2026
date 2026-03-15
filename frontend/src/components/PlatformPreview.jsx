import { Link } from "react-router-dom";

function PlatformPreview() {
  return (
    <section
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px 20px 60px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "24px",
          alignItems: "center",
        }}
      >
        <div>
          <p
            style={{
              color: "#60a5fa",
              fontWeight: "600",
              marginBottom: "12px",
            }}
          >
            Product Preview
          </p>

          <h2
            style={{
              color: "white",
              fontSize: "40px",
              marginTop: 0,
              marginBottom: "16px",
              lineHeight: 1.2,
            }}
          >
            Analyze stocks with AI-powered sentiment and strategy insights
          </h2>

          <p
            style={{
              color: "#a1a1aa",
              fontSize: "18px",
              lineHeight: 1.7,
              marginBottom: "24px",
            }}
          >
            Explore headline sentiment, backtested performance, and trading signals
            in one clean workflow. Search a ticker, inspect the latest signal,
            and compare strategy performance against buy-and-hold.
          </p>

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <Link
              to="/stock/DEMO"
              style={{
                backgroundColor: "#2563eb",
                color: "white",
                textDecoration: "none",
                padding: "14px 20px",
                borderRadius: "12px",
                fontWeight: "600",
              }}
            >
              View Stock Demo
            </Link>

            <Link
              to="/dashboard"
              style={{
                backgroundColor: "#18181b",
                color: "white",
                textDecoration: "none",
                padding: "14px 20px",
                borderRadius: "12px",
                border: "1px solid #27272a",
                fontWeight: "600",
              }}
            >
              Open Dashboard
            </Link>
          </div>
        </div>

        <div
          style={{
            background: "linear-gradient(180deg, #18181b 0%, #111827 100%)",
            border: "1px solid #27272a",
            borderRadius: "20px",
            padding: "24px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <div>
              <h3 style={{ margin: 0, color: "white" }}>AAPL</h3>
              <p style={{ margin: "6px 0 0 0", color: "#a1a1aa", fontSize: "14px" }}>
                Apple Inc. overview
              </p>
            </div>

            <div
              style={{
                backgroundColor: "rgba(34,197,94,0.15)",
                color: "#4ade80",
                border: "1px solid rgba(34,197,94,0.3)",
                borderRadius: "999px",
                padding: "6px 12px",
                fontSize: "13px",
                fontWeight: "700",
              }}
            >
              BUY
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "14px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                backgroundColor: "#0f172a",
                borderRadius: "14px",
                padding: "16px",
              }}
            >
              <p style={{ margin: 0, color: "#94a3b8", fontSize: "13px" }}>
                Strategy Return
              </p>
              <h4 style={{ margin: "8px 0 0 0", color: "white", fontSize: "24px" }}>
                +18.2%
              </h4>
            </div>

            <div
              style={{
                backgroundColor: "#0f172a",
                borderRadius: "14px",
                padding: "16px",
              }}
            >
              <p style={{ margin: 0, color: "#94a3b8", fontSize: "13px" }}>
                Buy & Hold
              </p>
              <h4 style={{ margin: "8px 0 0 0", color: "white", fontSize: "24px" }}>
                +11.0%
              </h4>
            </div>
          </div>

          <div
            style={{
              height: "180px",
              borderRadius: "16px",
              background:
                "linear-gradient(180deg, rgba(37,99,235,0.25) 0%, rgba(15,23,42,0.2) 100%)",
              border: "1px solid #1f2937",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#93c5fd",
              fontWeight: "600",
              marginBottom: "20px",
            }}
          >
            Strategy vs Benchmark Chart Preview
          </div>

          <div
            style={{
              borderTop: "1px solid #27272a",
              paddingTop: "16px",
            }}
          >
            <p style={{ margin: "0 0 8px 0", color: "white", fontWeight: "600" }}>
              Latest headline
            </p>
            <p style={{ margin: 0, color: "#a1a1aa", lineHeight: 1.6 }}>
              Apple cuts App Store fees in China after regulatory pressure.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PlatformPreview;