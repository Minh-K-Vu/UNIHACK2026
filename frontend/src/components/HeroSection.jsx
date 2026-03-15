import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section
      style={{
        minHeight: "calc(100vh - 200px) ",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <p
          style={{
            color: "#60a5fa",
            fontWeight: "700",
            marginBottom: "16px",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            fontSize: "13px",
          }}
        >
          AI-Powered Market Intelligence
        </p>

        <h1
          style={{
            fontSize: "72px",
            margin: "0 0 20px 0",
            color: "white",
            lineHeight: 1.05,
          }}
        >
          Turn news sentiment into trading signals
        </h1>

        <p
          style={{
            fontSize: "22px",
            color: "#a1a1aa",
            marginBottom: "32px",
            lineHeight: 1.7,
            maxWidth: "760px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Sentra AI helps traders and investors analyze financial headlines,
          generate AI-driven trading signals, and compare strategy performance
          against buy-and-hold in one streamlined platform.
        </p>

        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            marginBottom: "24px",
            justifyContent: "center",
          }}
        >
          <Link
            to="/signup"
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              textDecoration: "none",
              padding: "14px 22px",
              borderRadius: "12px",
              fontWeight: "600",
            }}
          >
            Get Started
          </Link>

          <Link
            to="/stock/AAPL"
            style={{
              backgroundColor: "#18181b",
              color: "white",
              textDecoration: "none",
              padding: "14px 22px",
              borderRadius: "12px",
              border: "1px solid #27272a",
              fontWeight: "600",
            }}
          >
            Explore Live Demo
          </Link>
        </div>

        <p
          style={{
            color: "#71717a",
            fontSize: "14px",
            margin: 0,
          }}
        >
          Analyze signals. Track market sentiment. Build conviction faster.
        </p>
      </div>
    </section>
  );
}

export default HeroSection;