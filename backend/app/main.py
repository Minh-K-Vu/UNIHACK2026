from fastapi import FastAPI, HTTPException # FastAPI framework for building APIs and HTTPException for handling errors
from fastapi.middleware.cors import CORSMiddleware # Middleware for handling Cross-Origin Resource Sharing (CORS)
from signal_engine import generate_signals # Import the generate_signals function from the signal_engine module
from backtest import run_backtest # Import the run_backtest function from the backtest module
import pandas as pd # Pandas library for data manipulation and analysis
from fetch_news import fetch_headlines, fetch_movers # Import the fetch_headlines and fetch_movers functions from the fetch_news module

app = FastAPI() # Create a FastAPI application instance

# Allow React to talk to this API from another port
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all origins (you can restrict this to specific domains in production)
    allow_methods=["*"], # Allow all HTTP methods
    allow_headers=["*"], # Allow all headers
)

cache = {} # Simple in-memory cache to store generated signals and backtest results for each ticker to avoid redundant processing
signals_cache = {} # Separate cache for signals to allow reusing them when fetching headlines or backtest results without regenerating signals each time

# Shared signals computation
def get_or_compute_signals(ticker: str, timeframe: str = "1mo", threshold: float = 0.3):
  cache_key = f"raw_{ticker}_{timeframe}_{threshold}"
  if cache_key not in signals_cache:
    signals_cache[cache_key] = generate_signals(ticker, timeframe, threshold) # Generate trading signals for the given stock ticker and timeframe and store it in the signals_cache
  return signals_cache[cache_key] # Return the generated signals and scored headlines from the cache

@app.get("/api/signals")
def get_signals(ticker: str, timeframe: str = "1mo", threshold: float = 0.3, capital: float = 10000): # Define the get_signals function that takes a stock ticker, timeframe, and sentiment threshold as input and returns the trading signals for that ticker
  try:
    # Return cached result if we've already run this ticker
    cache_key = f"signals_{ticker.upper()}_{timeframe}_{threshold}_{capital}"
    if cache_key in cache:
      return cache[cache_key]

    signals, headlines = get_or_compute_signals(ticker.upper(), timeframe, threshold) # Generate trading signals and get the scored headlines for the given stock ticker (converted to uppercase)
    result = signals.to_dict(orient="records") # Convert the resulting DataFrame of signals to a list of dictionaries to return as the API response
    
    # Save to cache before returning
    cache[cache_key] = result
    return result
  except Exception as e:
    raise HTTPException(status_code=500, detail=str(e)) # If there's an error, return a 500 Internal Server Error with the error message

@app.get("/api/headlines") # Define a GET endpoint at /api/headlines that takes a 'ticker' query parameter and returns the scored headlines for that ticker
def get_headlines(ticker: str, timeframe: str = "1mo"): # Define the get_headlines function that takes a stock ticker as input and returns the scored headlines for that ticker
  try:
    cache_key = f"headlines_{ticker.upper()}_{timeframe}"
    if cache_key in cache:
      return cache[cache_key]
    _, headlines = get_or_compute_signals(ticker.upper(), timeframe) # Generate trading signals and get the scored headlines for the given stock ticker (converted to uppercase)
    result = headlines[["date", "title", "sentiment", "confidence", "score", "url"]].to_dict(orient="records") # Convert resulting DataFrame of headlines to a list of dictionaries and return it as the API response
    cache[cache_key] = result
    return result
  except Exception as e:
    raise HTTPException(status_code=500, detail=str(e)) # If there's an error, return a 500 Internal Server Error with the error message

@app.get("/api/backtest") # Define a GET endpoint at /api/backtest that takes a 'ticker' query parameter and returns the backtest results for that ticker
def get_backtest(ticker: str, timeframe: str = "1mo", threshold: float = 0.3, capital: float = 10000): # Define the get_backtest function that takes a stock ticker as input and returns the backtest results for that ticker
  try:
    cache_key = f"backtest_{ticker.upper()}_{timeframe}_{threshold}_{capital}"
    if cache_key in cache:
      return cache[cache_key]
    
    signals, _ = get_or_compute_signals(ticker.upper(), timeframe, threshold) # Generate trading signals for the given stock ticker (converted to uppercase)
    metrics, backtest_df = run_backtest(ticker.upper(), signals, timeframe, capital) # Run the backtest using the generated signals and get the performance metrics and backtest DataFrame
    result = {
      "metrics": metrics,
      "chart_data": backtest_df.to_dict(orient="records") # Convert the backtest DataFrame to a list of dictionaries and include it in the API response under 'chart_data'
    }
    cache[cache_key] = result
    return result
  except Exception as e:
    raise HTTPException(status_code=500, detail=str(e)) # If there's an error, return a 500 Internal Server Error with the error message

@app.get("/api/summary") # Define a GET endpoint at /api/summary that takes a 'ticker' query parameter and returns a summary of the latest signal and backtest performance for that ticker
def get_summary(ticker: str, timeframe: str = "1mo", threshold: float = 0.3, capital: float = 10000): # Define the get_summary function that takes a stock ticker and timeframe as input and returns a summary of the latest signal and backtest performance for that ticker
  try:
    cache_key = f"summary_{ticker.upper()}_{timeframe}_{threshold}_{capital}"
    if cache_key in cache:
      return cache[cache_key]
    signals, headlines = get_or_compute_signals(ticker.upper(), timeframe, threshold) # Generate trading signals and get the scored headlines for the given stock ticker (converted to uppercase)
    metrics, _ = run_backtest(ticker.upper(), signals, timeframe, capital) # Run the backtest using the generated signals and get the performance metrics
    
    latest_signal = signals.iloc[-1] # Get the latest signal (the last row of the signals DataFrame) to include in the summary response
    
    result = {
      "ticker": ticker.upper(),
      "latest_signal": latest_signal["signal"],
      "latest_sentiment": round(latest_signal["daily_sentiment"], 3),
      "strategy_return": metrics["strategy_return"],
      "buyhold_return": metrics["buyhold_return"],
      "num_trades": metrics["num_trades"]
    }
    cache[cache_key] = result
    return result
  except Exception as e:
    raise HTTPException(status_code=500, detail=str(e)) # If there's an error, return a 500 Internal Server Error with the error message

@app.get("/api/movers")
def get_movers():
    try:
        cache_key = "movers_live"
        if cache_key in cache:
            return cache[cache_key]
        result = fetch_movers()
        cache[cache_key] = result
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

## DEMO DATA ##
from demo_data import generate_demo_data

@app.get("/api/demo")
def get_demo(capital: float = 10000.0):
    try:
        cache_key = f"demo_{capital}"
        if cache_key in cache:
            return cache[cache_key]
        result = generate_demo_data(capital)
        cache[cache_key] = result
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))