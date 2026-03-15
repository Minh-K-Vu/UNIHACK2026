-- Running the environment --
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

-- Running the server locally --
(inside py)
uvicorn main:app --reload

-- including .env --
create .env in backend/app
add NEWS_API_KEY=(api key)