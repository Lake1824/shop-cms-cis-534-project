import logging
from logging import Logger
from typing import Any

import elasticsearch
from flask import Flask, jsonify, Response, request
from flask_cors import CORS
from werkzeug.exceptions import BadRequest
from app.search.client import ElasticsearchClient
from app.controllers.restaurant import RestaurantController
from app.controllers.menu import MenuController
from app.controllers.feedback import FeedbackController
from app.util import verify_es_id_format

# Initialize Flask app
app: Flask = Flask(__name__)
CORS(app)

# Initialize Logging
logging.basicConfig(level=logging.INFO)
logger: Logger = logging.getLogger(__name__)

# Initialize ElasticSearch client singleton
es_client: ElasticsearchClient = ElasticsearchClient(logger)

# Restaurant Endpoints
@app.route("/api/v1/restaurants", methods=["GET"])
def get_restaurants()-> Response:
    controller: RestaurantController = RestaurantController(es_client, logger)
    restaurants: list[dict[str, Any]] = controller.get_all_restaurants()

    return jsonify(restaurants)

@app.route("/api/v1/restaurants/search", methods=["GET"])
def search_for_restaurants_by_name()-> tuple[Response, int] | Response:
    search_by_name_query = request.args.get("query")
    if not search_by_name_query:
        return jsonify({"error": "query parameter is required"}), 400

    if len(search_by_name_query) < 3:
        return jsonify({"error": "query is not long enough"}), 400

    controller: RestaurantController = RestaurantController(es_client, logger)
    restaurants: list[dict[str, Any]] = controller.search_by_name(search_by_name_query)

    return jsonify(restaurants)

@app.route("/api/v1/restaurants", methods=["POST"])
def create_restaurant()-> Response:
    controller: RestaurantController = RestaurantController(es_client, logger)
    new_restaurant_id = controller.create_restaurant(request.get_json())

    return jsonify({"success": f"{new_restaurant_id} was created"})

@app.route("/api/v1/restaurants/<restaurant_id>", methods=["GET"])
def get_restaurant(restaurant_id: str)-> Response:
    verify_es_id_format(restaurant_id)
    controller: RestaurantController = RestaurantController(es_client, logger)
    restaurant: dict[str, Any] = controller.get_restaurant(restaurant_id)

    return jsonify(restaurant)

@app.route("/api/v1/restaurants/<restaurant_id>", methods=["POST"])
def update_restaurant(restaurant_id: str)-> Response:
    verify_es_id_format(restaurant_id)
    controller: RestaurantController = RestaurantController(es_client, logger)
    controller.update_restaurant(restaurant_id, request.get_json())

    return jsonify({"success": f"{restaurant_id} was updated"})

@app.route("/api/v1/restaurants/<restaurant_id>", methods=["DELETE"])
def delete_restaurant(restaurant_id: str)-> Response:
    verify_es_id_format(restaurant_id)
    controller: RestaurantController = RestaurantController(es_client, logger)
    controller.delete_restaurant(restaurant_id)

    return jsonify({"success": f"{restaurant_id} was deleted"})

# Menu Endpoints
@app.route("/api/v1/menus/<restaurant_id>", methods=["GET"])
def get_restaurant_menus(restaurant_id: str)-> Response:
    verify_es_id_format(restaurant_id)
    controller: MenuController = MenuController(es_client, logger)
    menus: list[dict[str, Any]] = controller.get_all_restaurant_menus(restaurant_id)

    return jsonify(menus)

@app.route("/api/v1/menus", methods=["POST"])
def create_menu()-> Response:
    controller: MenuController = MenuController(es_client, logger)
    new_menu_id = controller.create_menu(request.get_json())

    return jsonify({"success": f"{new_menu_id} was created"})

@app.route("/api/v1/menus/menu/<menu_id>", methods=["GET"])
def get_menu(menu_id: str)-> Response:
    verify_es_id_format(menu_id)
    controller: MenuController = MenuController(es_client, logger)
    menu: list[dict[str, Any]] = controller.get_menu(menu_id)

    return jsonify(menu)

@app.route("/api/v1/menus/menu/<menu_id>", methods=["POST"])
def update_menu(menu_id: str)-> Response:
    verify_es_id_format(menu_id)
    controller: MenuController = MenuController(es_client, logger)
    controller.update_menu(menu_id, request.get_json())

    return jsonify({"success": f"{menu_id} was updated"})

@app.route("/api/v1/menus/menu/<menu_id>", methods=["DELETE"])
def delete_menu(menu_id: str)-> Response:
    verify_es_id_format(menu_id)
    controller: MenuController = MenuController(es_client, logger)
    controller.delete_menu(menu_id)

    return jsonify({"success": f"{menu_id} was deleted"})

@app.route("/api/v1/restaurants/menus/products/search", methods=["GET"])
def search_for_restaurants_products_by_name()-> tuple[Response, int] | Response:
    search_restaurants_products_by_name_query = request.args.get("query")
    restaurant_id = request.args.get("restaurant_id")
    if not search_restaurants_products_by_name_query:
        return jsonify({"error": "query parameter is required"}), 400

    if not restaurant_id:
        return jsonify({"error": "restaurant_id parameter is required"}), 400

    if len(search_restaurants_products_by_name_query) < 3:
        return jsonify({"error": "query is not long enough"}), 400

    controller: MenuController = MenuController(es_client, logger)
    products: list[dict[str, Any]] = controller.search_restaurants_products_by_name(search_restaurants_products_by_name_query, restaurant_id)

    return jsonify(products)

@app.route("/api/v1/menus/products/search", methods=["GET"])
def search_for_products_by_name()-> tuple[Response, int] | Response:
    search_by_name_query = request.args.get("query")
    if not search_by_name_query:
        return jsonify({"error": "query parameter is required"}), 400

    if len(search_by_name_query) < 3:
        return jsonify({"error": "query is not long enough"}), 400

    controller: MenuController = MenuController(es_client, logger)
    products: list[dict[str, Any]] = controller.search_products_by_name(search_by_name_query)

    return jsonify(products)

# Feedback Endpoints
@app.route("/api/v1/feedback/<restaurant_id>", methods=["GET"])
def get_restaurant_feedback(restaurant_id: str)-> Response:
    verify_es_id_format(restaurant_id)
    controller: FeedbackController = FeedbackController(es_client, logger)
    feedback: list[dict[str, Any]] = controller.get_all_restaurant_feedback(restaurant_id)

    return jsonify(feedback)

@app.route("/api/v1/feedback/<restaurant_id>/featured", methods=["GET"])
def get_restaurant_featured_feedback(restaurant_id: str)-> Response:
    verify_es_id_format(restaurant_id)
    controller: FeedbackController = FeedbackController(es_client, logger)
    featured_feedback: list[dict[str, Any]] = controller.get_all_restaurant_featured_feedback(restaurant_id)

    return jsonify(featured_feedback)

@app.route("/api/v1/feedback/<feedback_id>", methods=["POST"])
def update_feedback(feedback_id: str)-> Response:
    verify_es_id_format(feedback_id)
    controller: FeedbackController = FeedbackController(es_client, logger)
    controller.update_feedback(feedback_id, request.get_json())

    return jsonify({"success": f"{feedback_id} was updated"})

@app.route("/api/v1/feedback", methods=["POST"])
def create_feedback()-> Response:
    controller: FeedbackController = FeedbackController(es_client, logger)
    new_feedback_id = controller.create_feedback(request.get_json())

    return jsonify({"success": f"{new_feedback_id} was created"})

# Error Handlers
@app.errorhandler(elasticsearch.exceptions.NotFoundError)
def handle_not_found_error(error):
    return jsonify({"error": "Resource not found"}), 404

@app.errorhandler(BadRequest)
def handle_bad_request(error):
    return jsonify({"error": "Bad Request"}), 400
