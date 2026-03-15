from transformers import pipeline # Hugging Face Transformers library for NLP tasks

sentiment_model = pipeline("sentiment-analysis", model="ProsusAI/finbert") # Load the FinBERT model for financial sentiment analysis

def score_headlines(headlines: list[dict]) -> list[dict]:
    for h in headlines:
        result = sentiment_model(h["title"])[0] # Analyze the sentiment of the headline title and get the result as a dict with 'label' and 'score'
        h["sentiment"] = result["label"] # Add the sentiment label (e.g., 'positive', 'negative', 'neutral') to the headline dict
        h["confidence"] = result["score"]
    return headlines