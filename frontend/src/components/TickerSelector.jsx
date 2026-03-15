function TickerSelector({ tickers, selectedTicker, onChange }) {
  return (
    <div style={{ marginBottom: "24px" }}>
      <label
        htmlFor="ticker-select"
        style={{
          display: "block",
          marginBottom: "8px",
          color: "#a1a1aa",
          fontSize: "14px",
        }}
      >
        Select Ticker
      </label>

      <select
        id="ticker-select"
        value={selectedTicker}
        onChange={(e) => onChange(e.target.value)}
        style={{
          backgroundColor: "#18181b",
          color: "white",
          border: "1px solid #27272a",
          borderRadius: "10px",
          padding: "10px 14px",
          fontSize: "16px",
          minWidth: "180px",
        }}
      >
        {tickers.map((ticker) => (
          <option key={ticker} value={ticker}>
            {ticker}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TickerSelector;