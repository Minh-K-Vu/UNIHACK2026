import pandas as pd
from fetch_news import fetch_headlines
from sentiment import score_headlines

def sentiment_to_score(label: str, confidence: float) -> float:
  if label == "positive":
    return confidence
  elif label == "negative":
    return -confidence
  else:
    return 0.0
  
def generate_signals(ticker: str, timeframe: str = "1mo", threshold: float = 0.3):
  # 1: Fetch and score healdines
  headlines = fetch_headlines(ticker) # Fetch news headlines for the given stock ticker
  scored = score_headlines(headlines) # Analyze the sentiment of each headline and add 'sentiment' and 'confidence' to each headline dict

  # 2: Build a dataframe
  df = pd.DataFrame(scored) # Create a DataFrame from the list of scored headlines
  df["date"] = pd.to_datetime(df["timestamp"]).dt.date # Convert the timestamp to a datetime object and extract the date
  df["score"] = df.apply(
    lambda row: sentiment_to_score(row["sentiment"], row["confidence"]), axis=1
  )

  # Save headlines before aggregating
  df[["date", "title", "sentiment", "confidence", "score", "url"]].to_csv(
    "csv/headlines.csv", index=False
  )

  # 3: Aggregate to daily score
  # df = df[df["score"] != 0.0] # Filter out headlines with neutral sentiment (score of 0) to reduce noise in the signal < CHANGE IF WANT TO BE MORE AGGRESSIVE WITH SIGNALS >
  
  daily = df.groupby("date")["score"].mean().reset_index() # Group the DataFrame by date and calculate the mean score for each date
  if daily.empty:
    return pd.DataFrame(columns=["date", "daily_sentiment", "signal"]), df # If there are no scored headlines, return an empty DataFrame for signals and the original DataFrame for headlines
  daily.columns = ["date", "daily_sentiment"] # Rename the columns to 'date' and 'daily_sentiment'

  # 4: Apply signal rules
  # Can adjust these thresholds to be more or less aggressive in generating buy/sell signals
  def get_signal(score: float) -> str:
    if score > threshold:
      return "buy"
    elif score < -threshold:
      return "sell"
    else:
      return "hold"
    
  daily["signal"] = daily["daily_sentiment"].apply(get_signal) # Apply the get_signal function to the 'daily_sentiment' column to determine the trading signal for each date

  return daily, df[["date", "title", "sentiment", "confidence", "score", "url"]]