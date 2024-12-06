from myapp.celery import app
import time
from .models import Review


import os, sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
##from ai_web_pytorch.review_model import ReviewService
from ai_web_pytorch import model


##model = ReviewService()

@app.task()
def predict(string:str, review_id:int) -> None:
    modelRatings = model.predict_review_score(string)
    review = Review.objects.get(id = review_id)
    review.modelRatings = modelRatings
    review.save(update_fields=['modelRatings'])