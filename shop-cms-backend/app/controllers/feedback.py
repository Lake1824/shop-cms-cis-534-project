from datetime import datetime
from logging import Logger
from typing import Any

from app.search.client import ElasticsearchClient
from app.models.feedback import Feedback
import app.search.queries as queries
from werkzeug.exceptions import BadRequest

FEEDBACK_INDEX_NAME = "feedback"

class FeedbackController:
    def __init__(self, es_client: ElasticsearchClient, logger: Logger):
        self.es_client = es_client
        self.logger = logger

    def get_all_restaurant_feedback(self, restaurant_id: str) -> list[dict[str, Any]]:
        es_resp = self.es_client.get_all(FEEDBACK_INDEX_NAME, queries.build_get_all_restaurant_feedback_query(restaurant_id))

        feedbacks = []
        for feedback in es_resp:
            feedbacks.append(feedback["_source"])

        return feedbacks

    def get_all_restaurant_featured_feedback(self, restaurant_id: str) -> list[dict[str, Any]]:
        es_resp = self.es_client.get_all(FEEDBACK_INDEX_NAME, queries.build_get_restaurant_featured_feedback_query(restaurant_id))

        feedbacks = []
        for feedback in es_resp:
            feedbacks.append(feedback["_source"])

        return feedbacks

    def update_feedback(self, feedback_id: str, update_request: dict[str, Any]) -> None:
        es_resp = self.es_client.get(FEEDBACK_INDEX_NAME, feedback_id)
        try:
            current_feedback: Feedback = Feedback(**es_resp["_source"])
        except TypeError:
            raise BadRequest

        updated_feedback: Feedback = self.build_updated_feedback(current_feedback, update_request)
        self.es_client.update(FEEDBACK_INDEX_NAME, self.to_dict(updated_feedback))

    def create_feedback(self, create_request: dict[str, Any]) -> str:
        try:
            new_feedback: Feedback = Feedback(**create_request)
        except TypeError:
            raise BadRequest

        create_resp = self.es_client.create(FEEDBACK_INDEX_NAME, self.to_dict(new_feedback))
        new_feedback.id = create_resp["_id"]
        self.es_client.update(FEEDBACK_INDEX_NAME, self.to_dict(new_feedback))

        return new_feedback.id

    def build_updated_feedback(self, feedback: Feedback, update_request: dict[str, Any]) -> Feedback:
        for key in update_request.keys():
            if hasattr(feedback, key):
                setattr(feedback, key, update_request[key])
                self.logger.error(key)
            else:
                raise BadRequest
        feedback.updated_at = datetime.now()

        return feedback

    def to_dict(self, feedback) -> dict[str, Any]:
        return{
            "id": feedback.id,
            "restaurant_id": feedback.restaurant_id,
            "rating": feedback.rating,
            "comment": feedback.comment,
            "featured": feedback.featured,
            "created_at": feedback.created_at,
            "updated_at": feedback.updated_at,
        }
