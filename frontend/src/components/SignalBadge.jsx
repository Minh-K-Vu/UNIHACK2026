function SignalBadge({ signal }) {
  const styles = {
    buy: {
      backgroundColor: "rgba(34, 197, 94, 0.15)",
      color: "#4ade80",
      border: "1px solid rgba(34, 197, 94, 0.3)",
    },
    hold: {
      backgroundColor: "rgba(113, 113, 122, 0.15)",
      color: "#d4d4d8",
      border: "1px solid rgba(113, 113, 122, 0.3)",
    },
    sell: {
      backgroundColor: "rgba(239, 68, 68, 0.15)",
      color: "#f87171",
      border: "1px solid rgba(239, 68, 68, 0.3)",
    },
  };

  return (
    <span
      style={{
        ...styles[signal],
        borderRadius: "999px",
        padding: "6px 12px",
        fontSize: "14px",
        fontWeight: "600",
        display: "inline-block",
      }}
    >
      {signal.toUpperCase()}
    </span>
  );
}

export default SignalBadge;