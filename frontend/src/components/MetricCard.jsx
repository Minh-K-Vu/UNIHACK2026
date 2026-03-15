function MetricCard({ title, value, subtitle }) {
  return (
    <div
      style={{
        backgroundColor: "#18181b",
        border: "1px solid #27272a",
        borderRadius: "16px",
        padding: "20px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
      }}
    >
      <p style={{ color: "#a1a1aa", fontSize: "14px", margin: 0 }}>{title}</p>
      <h3
        style={{
          color: "white",
          fontSize: "28px",
          marginTop: "10px",
          marginBottom: "8px",
        }}
      >
        {value}
      </h3>
      <p style={{ color: "#71717a", fontSize: "12px", margin: 0 }}>
        {subtitle}
      </p>
    </div>
  );
}

export default MetricCard;