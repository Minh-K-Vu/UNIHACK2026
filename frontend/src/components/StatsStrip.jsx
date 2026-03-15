import { landingStats } from "../data/landingData";

function StatsStrip() {
  return (
    <section
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 20px 40px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px",
        }}
      >
        {landingStats.map((stat) => (
          <div
            key={stat.label}
            style={{
              backgroundColor: "#18181b",
              border: "1px solid #27272a",
              borderRadius: "16px",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                margin: "0 0 8px 0",
                fontSize: "28px",
                color: "white",
              }}
            >
              {stat.value}
            </h3>
            <p
              style={{
                margin: 0,
                color: "#a1a1aa",
                fontSize: "14px",
              }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StatsStrip;