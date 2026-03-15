import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function BacktestChart({ data, ticker }) {
  const [hiddenLines, setHiddenLines] = useState({});

  function handleLegendClick(e) {
    setHiddenLines((prev) => ({
      ...prev,
      [e.dataKey]: !prev[e.dataKey],
    }));
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
      <h2 style={{ marginTop: 0, marginBottom: "16px", color: "white" }}>
        Strategy vs Buy & Hold for {ticker}
      </h2>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <CartesianGrid stroke="#27272a" strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke="#a1a1aa" tick={{ fontSize: 11 }} angle={-35} textAnchor="end" height={50} />
          
          {/* Left axis — portfolio value */}
          <YAxis
            yAxisId="portfolio"
            stroke="#a1a1aa"
            tickFormatter={(v) => `$${v.toFixed(0)}`}
          />

          {/* Right axis — stock price */}
          <YAxis
            yAxisId="price"
            orientation="right"
            stroke="#facc15"
            tickFormatter={(v) => `$${v.toFixed(0)}`}
          />

          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
          <Legend onClick={handleLegendClick} style={{ cursor: "pointer" }} />

          <Line
            yAxisId="price"
            type="monotone"
            dataKey="close"
            stroke="#facc15"
            strokeWidth={2}
            dot={false}
            name="Stock Price"
            hide={hiddenLines["close"]}
          />
          <Line
            yAxisId="portfolio"
            type="monotone"
            dataKey="strategyValue"
            stroke="#22c55e"
            strokeWidth={3}
            dot={{ r: 4 }}
            name="Strategy"
            hide={hiddenLines["strategyValue"]}
          />
          <Line
            yAxisId="portfolio"
            type="monotone"
            dataKey="benchmarkValue"
            stroke="#a1a1aa"
            strokeWidth={3}
            dot={{ r: 4 }}
            name="Buy & Hold"
            hide={hiddenLines["benchmarkValue"]}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BacktestChart;