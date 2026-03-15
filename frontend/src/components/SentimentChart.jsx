import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

function SentimentChart({ data }) {
  // Custom dot coloured by signal
  function CustomDot({ cx, cy, payload }) {
    const color =
      payload.signal === "buy" ? "#4ade80" :
      payload.signal === "sell" ? "#f87171" :
      "#a1a1aa";

    return <circle cx={cx} cy={cy} r={6} fill={color} stroke="#09090b" strokeWidth={2} />;
  }

  // Custom tooltip showing both sentiment and signal
  function CustomTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;
    const { sentiment, signal } = payload[0].payload;

    const signalColor =
      signal === "buy" ? "#4ade80" :
      signal === "sell" ? "#f87171" :
      "#a1a1aa";

    return (
      <div style={{
        backgroundColor: "#18181b",
        border: "1px solid #27272a",
        borderRadius: "8px",
        padding: "10px 14px",
      }}>
        <p style={{ margin: "0 0 4px 0", color: "#a1a1aa", fontSize: "12px" }}>{label}</p>
        <p style={{ margin: "0 0 4px 0", color: "white", fontSize: "13px" }}>
          Sentiment: {sentiment?.toFixed(3)}
        </p>
        <p style={{ margin: 0, color: signalColor, fontSize: "13px", fontWeight: "700" }}>
          Signal: {signal?.toUpperCase()}
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#18181b",
        border: "1px solid #27272a",
        borderRadius: "16px",
        padding: "20px",
        height: "360px",
      }}
    >
      <h2 style={{ marginTop: 0, marginBottom: "8px", color: "white" }}>
        Sentiment Over Time
      </h2>

      {/* Legend */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "12px" }}>
        {[["buy", "#4ade80"], ["hold", "#a1a1aa"], ["sell", "#f87171"]].map(([label, color]) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: color }} />
            <span style={{ color: "#a1a1aa", fontSize: "12px", textTransform: "capitalize" }}>{label}</span>
          </div>
        ))}
      </div>

      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={data}>
          <CartesianGrid stroke="#27272a" strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke="#a1a1aa" tick={{ fontSize: 11 }} angle={-35} textAnchor="end" height={50} />
          <YAxis stroke="#a1a1aa" domain={["auto", "auto"]} />
          <Tooltip content={<CustomTooltip />} />

          {/* Zero line */}
          <ReferenceLine y={0} stroke="#71717a" />

          {/* Buy and sell threshold lines */}
          <ReferenceLine y={0.3} stroke="#4ade80" strokeDasharray="4 4" label={{ value: "Buy", fill: "#4ade80", fontSize: 11 }} />
          <ReferenceLine y={-0.3} stroke="#f87171" strokeDasharray="4 4" label={{ value: "Sell", fill: "#f87171", fontSize: 11 }} />

          <Line
            type="monotone"
            dataKey="sentiment"
            stroke="#4f46e5"
            strokeWidth={3}
            dot={<CustomDot />}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SentimentChart;