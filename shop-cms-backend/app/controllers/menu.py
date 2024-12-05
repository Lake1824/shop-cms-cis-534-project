from datetime import datetime
from logging import Logger
from typing import Any

from app.search.client import ElasticsearchClient
from werkzeug.exceptions import BadRequest
from app.models.menu import Menu
import app.search.queries as queries

MENU_INDEX_NAME = "menu"

class MenuController:
    def __init__(self, es_client: ElasticsearchClient, logger: Logger):
        self.es_client = es_client
        self.logger = logger

    def get_all_restaurant_menus(self, restaurant_id: str) -> list[dict[str, Any]]:
        es_resp = self.es_client.get_all(
            MENU_INDEX_NAME,
            queries.build_get_all_restaurants_menu_query(restaurant_id)
        )

        menus = []
        for menu in es_resp:
            menus.append(menu["_source"])

        return menus

    def search_restaurants_products_by_name(self, restaurant_product_name: str, restaurant_id) -> list[dict[str, Any]]:
        es_resp = self.es_client.search(MENU_INDEX_NAME, queries.build_search_for_restaurants_products_by_name_query(restaurant_product_name, restaurant_id))

        products = []
        for menu_products in es_resp:
            for menu_product in menu_products["inner_hits"]["products"]["hits"]["hits"]:
                products.append(
                    {
                        "menu_id": menu_product["_id"],
                        "product": menu_product.get("_source", {})
                    }
                )

        return products

    def search_products_by_name(self, product_name: str) -> list[dict[str, Any]]:
        es_resp = self.es_client.search(MENU_INDEX_NAME, queries.build_search_for_products_by_name_query(product_name))

        products = []
        for restaurant_menu_products in es_resp:
            for menu_product in restaurant_menu_products["inner_hits"]["products"]["hits"]["hits"]:
                products.append(
                    {
                        "menu_id": menu_product["_id"],
                        "product": menu_product.get("_source", {})
                    }
                )

        return products

    def get_menu(self, menu_id: str) -> dict[str, Any]:
        return self.es_client.get(MENU_INDEX_NAME, menu_id)["_source"]

    def delete_menu(self, menu_id: str) -> None:
        self.es_client.delete(MENU_INDEX_NAME, menu_id)

    def update_menu(self, menu_id: str, update_request: dict[str, Any]) -> None:
        es_resp = self.get_menu(menu_id)
        try:
            current_menu: Menu = Menu(**es_resp)
        except TypeError:
            raise BadRequest

        updated_menu: Menu = self.build_updated_menu(current_menu, update_request)
        self.es_client.update(MENU_INDEX_NAME, self.to_dict(updated_menu))

    def create_menu(self, create_request: dict[str, Any]) -> str:
        try:
            new_menu: Menu = Menu(**create_request)
        except TypeError:
            raise BadRequest

        create_resp = self.es_client.create(MENU_INDEX_NAME, self.to_dict(new_menu))
        new_menu.id = create_resp["_id"]
        self.es_client.update(MENU_INDEX_NAME, self.to_dict(new_menu))

        return new_menu.id

    def build_updated_menu(self, menu: Menu, update_request: dict[str, Any]) -> Menu:
        for key in update_request.keys():
            if hasattr(menu, key):
                setattr(menu, key, update_request[key])
            else:
                raise BadRequest
        menu.updated_at = datetime.now()

        return menu

    def to_dict(self, menu) -> dict[str, Any]:
        return{
            "restaurant_id": menu.restaurant_id,
            "name": menu.name,
            "id": menu.id,
            "products": menu.products,
            "categories": menu.categories,
            "created_at": menu.created_at,
            "updated_at": menu.updated_at,
        }
