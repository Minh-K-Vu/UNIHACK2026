# demo_data.py
import pandas as pd
import numpy as np
from datetime import datetime, timedelta

def generate_demo_data(initial_capital: float = 10000.0) -> dict:
    np.random.seed(42)
    start_date = datetime.now() - timedelta(days=30)
    dates = [start_date + timedelta(days=i) for i in range(30)]
    date_strs = [d.strftime("%Y-%m-%d") for d in dates]

    # --- Sentiment arc ---
    # Days 0-8:   positive buzz (product launch rumours)
    # Days 9-14:  neutral/mixed
    # Days 15-20: sharp negative (earnings miss + scandal)
    # Days 21-29: slowly recovering
    sentiment_scores = (
        [round(np.random.uniform(0.35, 0.75), 3) for _ in range(9)]   # positive
      + [round(np.random.uniform(-0.15, 0.15), 3) for _ in range(6)]  # neutral
      + [round(np.random.uniform(-0.80, -0.40), 3) for _ in range(6)] # crash
      + [round(np.random.uniform(-0.25, 0.10), 3) for _ in range(9)]  # recovery
    )

    def get_signal(score):
        if score > 0.3:
            return "buy"
        elif score < -0.3:
            return "sell"
        return "hold"

    signals = [get_signal(s) for s in sentiment_scores]

    # --- Price arc ---
    # Starts at $150, rises with positive sentiment, crashes at day 15, partial recovery
    price = 150.0
    prices = []
    for i, score in enumerate(sentiment_scores):
        noise = np.random.uniform(-1.5, 1.5)
        if i < 9:
            price += np.random.uniform(1.0, 3.0) + noise   # rising
        elif i < 15:
            price += np.random.uniform(-1.0, 1.0) + noise  # flat
        elif i < 21:
            price -= np.random.uniform(3.0, 6.0) + noise   # crash
        else:
            price += np.random.uniform(-0.5, 1.5) + noise  # slow recovery
        prices.append(round(max(price, 50.0), 2))

    # --- Simulate strategy ---
    cash = initial_capital
    holdings = 0.0
    position = "out"
    strategy_values = []

    for i, signal in enumerate(signals):
        if signal == "buy" and position == "out":
            holdings = cash / prices[i]
            cash = 0.0
            position = "in"
        elif signal == "sell" and position == "in":
            cash = holdings * prices[i]
            holdings = 0.0
            position = "out"
        value = cash + (holdings * prices[i])
        strategy_values.append(round(value, 2))

    # --- Buy and hold ---
    shares = initial_capital / prices[0]
    buyhold_values = [round(shares * p, 2) for p in prices]

    # --- Headlines ---
    headline_templates = {
        "positive": [
            "DEMO surges as new product launch exceeds expectations",
            "Analysts upgrade DEMO to strong buy ahead of earnings",
            "DEMO reports record revenue growth for third consecutive quarter",
            "Institutional investors increase stake in DEMO amid optimism",
            "DEMO partnership announcement drives investor confidence",
        ],
        "neutral": [
            "DEMO holds steady as market awaits earnings report",
            "Analysts maintain neutral outlook on DEMO stock",
            "DEMO trading volume remains average ahead of announcement",
            "Market watchers monitor DEMO for direction signals",
            "DEMO CEO comments on industry trends at conference",
        ],
        "negative": [
            "DEMO earnings miss expectations by wide margin",
            "DEMO faces regulatory scrutiny over business practices",
            "Insider selling raises concerns about DEMO outlook",
            "DEMO cuts guidance amid worsening market conditions",
            "DEMO loses major contract sending shares lower",
        ],
    }

    headlines = []
    for i, (date, score) in enumerate(zip(date_strs, sentiment_scores)):
        if score > 0.3:
            sentiment = "positive"
        elif score < -0.3:
            sentiment = "negative"
        else:
            sentiment = "neutral"

        # 1-3 headlines per day
        num_headlines = np.random.randint(1, 4)
        for j in range(num_headlines):
            title = headline_templates[sentiment][j % len(headline_templates[sentiment])]
            confidence = round(abs(score) + np.random.uniform(0.05, 0.15), 3)
            confidence = min(confidence, 0.99)
            headlines.append({
                "date": date,
                "title": title,
                "sentiment": sentiment,
                "confidence": round(confidence, 3),
                "score": round(score * confidence, 3),
            })

    # --- Metrics ---
    final_strategy = strategy_values[-1]
    final_buyhold = buyhold_values[-1]

    metrics = {
        "strategy_return": round((final_strategy - initial_capital) / initial_capital * 100, 2),
        "buyhold_return": round((final_buyhold - initial_capital) / initial_capital * 100, 2),
        "final_strategy_value": round(final_strategy, 2),
        "final_buyhold_value": round(final_buyhold, 2),
        "num_trades": signals.count("buy") + signals.count("sell"),
    }

    # --- Chart data ---
    chart_data = [
        {
            "date": date_strs[i],
            "close": prices[i],
            "signal": signals[i],
            "strategy_value": strategy_values[i],
            "buyhold_value": buyhold_values[i],
        }
        for i in range(30)
    ]

    # --- Daily signals ---
    daily_signals = [
        {
            "date": date_strs[i],
            "daily_sentiment": sentiment_scores[i],
            "signal": signals[i],
        }
        for i in range(30)
    ]

    return {
        "summary": {
            "ticker": "DEMO",
            "latest_signal": signals[-1],
            "latest_sentiment": sentiment_scores[-1],
            "strategy_return": metrics["strategy_return"],
            "buyhold_return": metrics["buyhold_return"],
            "num_trades": metrics["num_trades"],
        },
        "signals": daily_signals,
        "headlines": headlines,
        "backtest": {
            "metrics": metrics,
            "chart_data": chart_data,
        }
    }