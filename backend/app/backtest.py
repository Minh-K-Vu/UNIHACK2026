import yfinance as yf
import pandas as pd

def run_backtest(ticker: str, signals_df: pd.DataFrame, timeframe: str = "1mo", initial_capital: float = 10000.0) -> tuple[dict, pd.DataFrame]:
  # 1: Fetch historical price data
  period_map = {
    "1d":  "1d",
    "3d":  "5d",   # yfinance minimum is 5d
    "1wk": "1wk",
    "2wk": "1mo",  # yfinance doesn't have 2wk, 1mo is closest
    "1mo": "1mo",
  }.get(timeframe, "1mo")
  stock = yf.Ticker(ticker)
  prices = stock.history(period=period_map)["Close"].reset_index()
  prices.columns = ["date", "close"] # Rename the columns to 'date' and 'close'
  prices["date"] = pd.to_datetime(prices["date"]).dt.date # Convert the 'date' column to datetime and extract the date

  # 2: Merge prices with signals
  signals_df["date"] = pd.to_datetime(signals_df["date"]).dt.date # Ensure the 'date' column in signals_df is also in date format
  df = pd.merge(prices, signals_df, on="date", how="left") # Merge the price data with the signals on the 'date' column
  df["signal"] = df["signal"].fillna("hold") # Fill any missing signals with 'hold'

  # 3: Simulate strategy
  cash = initial_capital
  holdings = 0.0
  position = "out" # starts out of market
  strategy_values = []

  for _, row in df.iterrows():
        if row["signal"] == "buy" and position == "out":
            # Buy in — convert all cash to stock
            holdings = cash / row["close"]
            cash = 0.0
            position = "in"

        elif row["signal"] == "sell" and position == "in":
            # Sell out — convert all stock to cash
            cash = holdings * row["close"]
            holdings = 0.0
            position = "out"

        # Portfolio value today
        value = cash + (holdings * row["close"])
        strategy_values.append(value)

  df["strategy_value"] = strategy_values # Add the strategy value to the DataFrame

  # 4: Buy and hold comparison
  shares_bought = initial_capital / df["close"].iloc[0] # Calculate how many shares we could buy at the start with the initial capital
  df["buyhold_value"] = shares_bought * df["close"] # Calculate the value of the buy-and-hold strategy over time

  # 5: Summary metrics
  final_strategy = df["strategy_value"].iloc[-1] # Final value of the strategy
  final_buyhold = df["buyhold_value"].iloc[-1] # Final value of the buy-and-hold strategy

  metrics = {
    "strategy_return": round((final_strategy - initial_capital) / initial_capital * 100, 2),
    "buyhold_return": round((final_buyhold - initial_capital) / initial_capital * 100, 2),
    "final_strategy_value": round(final_strategy, 2),
    "final_buyhold_value": round(final_buyhold, 2),
    "num_trades": int((df["signal"] == "buy").sum() + (df["signal"] == "sell").sum()),
  }

  return metrics, df[["date", "close", "signal", "strategy_value", "buyhold_value"]]

if __name__ == "__main__":
    from signal_engine import generate_signals

    signals, _ = generate_signals("AAPL")
    metrics, backtest_df = run_backtest("AAPL", signals)

    print("\n--- Backtest Results ---")
    for key, value in metrics.items():
        print(f"{key}: {value}")

    backtest_df.to_csv("csv/backtest.csv", index=False)
    print("\nSaved to csv/backtest.csv")