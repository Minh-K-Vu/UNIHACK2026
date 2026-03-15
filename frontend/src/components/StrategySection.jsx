import { strategySteps } from "../data/landingData";

function StrategySection() {
  return (
    <section
      style={{
        padding: "40px 20px 80px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <h2
        style={{
          color: "white",
          fontSize: "32px",
          marginBottom: "16px",
        }}
      >
        How Sentra AI Works
      </h2>

      <p
        style={{
          color: "#a1a1aa",
          fontSize: "18px",
          marginBottom: "28px",
          lineHeight: 1.6,
          maxWidth: "800px",
          margin: "0 auto 28px auto",
        }}
      >
        Sentra AI transforms financial headlines into trading signals by combining
        natural language processing, signal generation, and historical backtesting.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "16px",
        }}
      >
        {strategySteps.map((step) => (
          <div
            key={step.title}
            style={{
              backgroundColor: "#18181b",
              border: "1px solid #27272a",
              borderRadius: "16px",
              padding: "20px",
            }}
          >
            <h3 style={{ color: "white", marginTop: 0, marginBottom: "12px" }}>
              {step.title}
            </h3>
            <p style={{ color: "#a1a1aa", lineHeight: 1.6, margin: 0 }}>
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StrategySection;