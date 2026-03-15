export const topMovers = [
  {
    ticker: "NVDA",
    name: "NVIDIA",
    price: 1105.24,
    change: "+4.82%",
  },
  {
    ticker: "TSLA",
    name: "Tesla",
    price: 182.17,
    change: "-2.41%",
  },
  {
    ticker: "AAPL",
    name: "Apple",
    price: 253.83,
    change: "-0.76%",
  },
  {
    ticker: "MSFT",
    name: "Microsoft",
    price: 421.55,
    change: "+1.36%",
  },
];

export const highImpactEvents = [
  {
    title: "Apple cuts App Store fees in China after regulatory pressure",
    ticker: "AAPL",
    impact: "High",
    sentiment: "Negative",
  },
  {
    title: "NVIDIA demand rises on AI infrastructure spending",
    ticker: "NVDA",
    impact: "High",
    sentiment: "Positive",
  },
  {
    title: "Tesla delivery concerns pressure investor outlook",
    ticker: "TSLA",
    impact: "Medium",
    sentiment: "Negative",
  },
];

export const strategySteps = [
  {
    title: "1. Collect Headlines",
    description:
      "We gather financial headlines related to a stock from recent market news.",
  },
  {
    title: "2. Score Sentiment",
    description:
      "Our NLP model classifies each headline as positive, neutral, or negative.",
  },
  {
    title: "3. Generate Signals",
    description:
      "Daily sentiment is converted into buy, hold, or sell trading signals.",
  },
  {
    title: "4. Backtest Performance",
    description:
      "The strategy is tested against historical price data and compared to buy-and-hold.",
  },
];

export const landingStats = [
  {
    label: "Tracked Headlines",
    value: "10K+",
  },
  {
    label: "Signals Generated",
    value: "2.4K",
  },
  {
    label: "Stocks Covered",
    value: "50+",
  },
  {
    label: "Backtests Run",
    value: "1.2K",
  },
];