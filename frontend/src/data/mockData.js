export const mockTickers = ["AAPL", "TSLA", "NVDA"];

export const mockHeadlines = [
  {
    id: 1,
    ticker: "AAPL",
    headline: "Apple beats analyst expectations in Q1 earnings",
    publishedAt: "2026-03-13 09:30",
    sentimentLabel: "positive",
    sentimentScore: 0.82,
  },
  {
    id: 2,
    ticker: "AAPL",
    headline: "Apple expands AI features across devices",
    publishedAt: "2026-03-12 15:00",
    sentimentLabel: "positive",
    sentimentScore: 0.74,
  },
  {
    id: 3,
    ticker: "TSLA",
    headline: "Tesla faces delivery concerns in key markets",
    publishedAt: "2026-03-13 11:20",
    sentimentLabel: "negative",
    sentimentScore: 0.69,
  },
  {
    id: 4,
    ticker: "TSLA",
    headline: "Tesla energy business shows strong growth",
    publishedAt: "2026-03-12 14:10",
    sentimentLabel: "positive",
    sentimentScore: 0.71,
  },
  {
    id: 5,
    ticker: "NVDA",
    headline: "NVIDIA demand surges on AI infrastructure spending",
    publishedAt: "2026-03-13 08:45",
    sentimentLabel: "positive",
    sentimentScore: 0.88,
  },
  {
    id: 6,
    ticker: "NVDA",
    headline: "Chip export restrictions create uncertainty",
    publishedAt: "2026-03-12 13:05",
    sentimentLabel: "negative",
    sentimentScore: 0.58,
  },
];

export const mockSignals = [
  { date: "2026-03-07", ticker: "AAPL", signal: "hold", sentiment: 0.10 },
  { date: "2026-03-08", ticker: "AAPL", signal: "buy", sentiment: 0.22 },
  { date: "2026-03-09", ticker: "AAPL", signal: "sell", sentiment: -0.12 },
  { date: "2026-03-10", ticker: "AAPL", signal: "buy", sentiment: 0.35 },
  { date: "2026-03-11", ticker: "AAPL", signal: "hold", sentiment: -0.08 },
  { date: "2026-03-12", ticker: "AAPL", signal: "buy", sentiment: 0.28 },
  { date: "2026-03-13", ticker: "AAPL", signal: "buy", sentiment: 0.41 },

  { date: "2026-03-07", ticker: "TSLA", signal: "sell", sentiment: -0.18 },
  { date: "2026-03-08", ticker: "TSLA", signal: "hold", sentiment: 0.04 },
  { date: "2026-03-09", ticker: "TSLA", signal: "sell", sentiment: -0.20 },
  { date: "2026-03-10", ticker: "TSLA", signal: "hold", sentiment: -0.02 },
  { date: "2026-03-11", ticker: "TSLA", signal: "buy", sentiment: 0.16 },
  { date: "2026-03-12", ticker: "TSLA", signal: "hold", sentiment: 0.03 },
  { date: "2026-03-13", ticker: "TSLA", signal: "sell", sentiment: -0.10 },

  { date: "2026-03-07", ticker: "NVDA", signal: "buy", sentiment: 0.30 },
  { date: "2026-03-08", ticker: "NVDA", signal: "buy", sentiment: 0.26 },
  { date: "2026-03-09", ticker: "NVDA", signal: "hold", sentiment: 0.08 },
  { date: "2026-03-10", ticker: "NVDA", signal: "buy", sentiment: 0.42 },
  { date: "2026-03-11", ticker: "NVDA", signal: "buy", sentiment: 0.37 },
  { date: "2026-03-12", ticker: "NVDA", signal: "hold", sentiment: -0.01 },
  { date: "2026-03-13", ticker: "NVDA", signal: "buy", sentiment: 0.48 },
];

export const mockMetrics = {
  strategyReturn: 18.0,
  buyHoldReturn: 11.0,
  maxDrawdown: 7.0,
  headlinesAnalysed: 6,
};

export const mockBacktest = {
  AAPL: [
    { date: "2026-03-07", strategyValue: 10000, benchmarkValue: 10000 },
    { date: "2026-03-08", strategyValue: 10150, benchmarkValue: 10080 },
    { date: "2026-03-09", strategyValue: 10090, benchmarkValue: 10020 },
    { date: "2026-03-10", strategyValue: 10320, benchmarkValue: 10170 },
    { date: "2026-03-11", strategyValue: 10280, benchmarkValue: 10110 },
    { date: "2026-03-12", strategyValue: 10460, benchmarkValue: 10220 },
    { date: "2026-03-13", strategyValue: 10800, benchmarkValue: 10400 },
  ],
  TSLA: [
    { date: "2026-03-07", strategyValue: 10000, benchmarkValue: 10000 },
    { date: "2026-03-08", strategyValue: 9950, benchmarkValue: 9980 },
    { date: "2026-03-09", strategyValue: 10080, benchmarkValue: 9900 },
    { date: "2026-03-10", strategyValue: 10110, benchmarkValue: 9850 },
    { date: "2026-03-11", strategyValue: 10220, benchmarkValue: 9920 },
    { date: "2026-03-12", strategyValue: 10190, benchmarkValue: 9880 },
    { date: "2026-03-13", strategyValue: 10340, benchmarkValue: 9810 },
  ],
  NVDA: [
    { date: "2026-03-07", strategyValue: 10000, benchmarkValue: 10000 },
    { date: "2026-03-08", strategyValue: 10220, benchmarkValue: 10150 },
    { date: "2026-03-09", strategyValue: 10300, benchmarkValue: 10210 },
    { date: "2026-03-10", strategyValue: 10580, benchmarkValue: 10410 },
    { date: "2026-03-11", strategyValue: 10720, benchmarkValue: 10520 },
    { date: "2026-03-12", strategyValue: 10690, benchmarkValue: 10490 },
    { date: "2026-03-13", strategyValue: 11050, benchmarkValue: 10700 },
  ],
};