from datetime import datetime
from logging import Logger
from typing import Any

from app.search.client import ElasticsearchClient
from werkzeug.exceptions import BadRequest
from app.models.restaurant import Restaurant
import app.search.queries as queries

RESTAURANT_INDEX_NAME = "restaurant"

class RestaurantController:
    def __init__(self, es_client: ElasticsearchClient, logger: Logger):
        self.es_client = es_client
        self.logger = logger

    def get_all_restaurants(self) -> list[dict[str, Any]]:
        es_resp = self.es_client.get_all(RESTAURANT_INDEX_NAME)

        restaurants = []
        for restaurant in es_resp:
            restaurants.append(restaurant["_source"])

        return restaurants

    def search_by_name(self, restaurant_name: str) -> list[dict[str, Any]]:
        es_resp = self.es_client.search(RESTAURANT_INDEX_NAME, queries.build_search_for_restaurants_by_name_query(restaurant_name))

        restaurants = []
        for restaurant in es_resp:
            restaurants.append(restaurant["_source"])

        return restaurants

    def get_restaurant(self, id: str) -> dict[str, Any]:
        return self.es_client.get(RESTAURANT_INDEX_NAME, id)["_source"]

    def delete_restaurant(self, id: str) -> None:
        self.es_client.delete(RESTAURANT_INDEX_NAME, id)
    
    def update_restaurant(self, restaurant_id: str, update_request: dict[str, Any]) -> None:
        es_resp = self.get_restaurant(restaurant_id)
        try:
            current_restaurant: Restaurant = Restaurant(**es_resp)
        except TypeError:
            raise BadRequest

        updated_restaurant: Restaurant = self.build_updated_restaurant(current_restaurant, update_request)
        self.es_client.update(RESTAURANT_INDEX_NAME, self.to_dict(updated_restaurant))

    def create_restaurant(self, create_request: dict[str, Any]) -> str:
        try:
            new_restaurant: Restaurant = Restaurant(**create_request)
        except TypeError:
            raise BadRequest

        create_resp = self.es_client.create(RESTAURANT_INDEX_NAME, self.to_dict(new_restaurant))
        new_restaurant.id = create_resp["_id"]
        self.es_client.update(RESTAURANT_INDEX_NAME, self.to_dict(new_restaurant))

        return new_restaurant.id

    def build_updated_restaurant(self, restaurant: Restaurant, update_request: dict[str, Any]) -> Restaurant:
        for key in update_request.keys():
            if hasattr(restaurant, key):
                setattr(restaurant, key, update_request[key])
            else:
                raise BadRequest
        restaurant.updated_at = datetime.now()

        return restaurant

    def to_dict(self, restaurant) -> dict[str, Any]:
        return{
            "id": restaurant.id,
            "name": restaurant.name,
            "description": restaurant.description,
            "street": restaurant.street,
            "city": restaurant.city,
            "state": restaurant.state,
            "zipcode": restaurant.zipcode,
            "facebook_link": restaurant.facebook_link,
            "x_link": restaurant.x_link,
            "instagram_link": restaurant.instagram_link,
            "hours": restaurant.hours,
            "created_at": restaurant.created_at,
            "updated_at": restaurant.updated_at,
        }
