class ShopCmsBackendClient {
    static async getRestaurants() {
        let response = await fetch(`http://localhost:8000/api/v1/restaurants`);

        if (response.status === 200) {
            return await response.json();
        }
        return [];
    }

    static async getRestaurant(restaurant_id) {
        let response = await fetch(`http://localhost:8000/api/v1/restaurants/${restaurant_id}`);

        if (response.status === 200) {
            return await response.json();
        }
        return {};
    }

    static async searchForRestaurants(search_query) {
        let response = await fetch(`http://localhost:8000/api/v1/restaurants/search?query=${search_query}`);

        if (response.status === 200) {
            return await response.json();
        }
        return [];
    };

    static async getMenus(restaurant_id) {
        let response = await fetch(`http://localhost:8000/api/v1/menus/${restaurant_id}`);

        if (response.status === 200) {
            return await response.json();
        }
        return [];
    }

    static async getMenu(menu_id) {
        let response = await fetch(`http://localhost:8000/api/v1/menus/menu/${menu_id}`);

        if (response.status === 200) {
            return await response.json();
        }
        return {};
    }

    static async deleteMenu(menu_id) {
        await fetch(`http://localhost:8000/api/v1/menus/menu/${menu_id}`, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
    }

    static async updateMenu(menu_id, menu_json) {
        await fetch(`http://localhost:8000/api/v1/menus/menu/${menu_id}`, {
            method: 'POST',
            body: menu_json,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
    }

    static async createMenu(menu_json) {
        await fetch(`http://localhost:8000/api/v1/menus`, {
            method: 'POST',
            body: menu_json,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
    };

    static async searchForRestaurantProducts(restaurant_id, search_query) {
        let response = await fetch(
            `http://localhost:8000/api/v1/restaurants/menus/products/search?restaurant_id=${restaurant_id}&query=${search_query}`
        );

        if (response.status === 200) {
            return await response.json();
        }
        return [];
    };

    static async getRestaurantFeaturedFeedback(restaurant_id) {
        let response = await fetch(`http://localhost:8000/api/v1/feedback/${restaurant_id}/featured`);

        if (response.status === 200) {
            return await response.json();
        }
        return [];
    };

    static async getRestaurantFeedback(restaurant_id) {
        let response = await fetch(`http://localhost:8000/api/v1/feedback/${restaurant_id}`);

        if (response.status === 200) {
            return await response.json();
        }
        return [];
    };

    static async updateFeedbackFeaturedStatus(restaurant_id, featured_status) {
        await fetch(`http://localhost:8000/api/v1/feedback/${restaurant_id}`, {
            method: 'POST',
            body: JSON.stringify({featured: featured_status}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
    }

    static async createRestaurantFeedback(feedback_json) {
        await fetch(`http://localhost:8000/api/v1/feedback`, {
            method: 'POST',
            body: feedback_json,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
    };

    static async createRestaurant(restaurant_json) {
        await fetch(`http://localhost:8000/api/v1/restaurants`, {
            method: 'POST',
            body: restaurant_json,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
    };

    static async updateRestaurant(restaurant_id, restaurant_json) {
        await fetch(`http://localhost:8000/api/v1/restaurants/${restaurant_id}`, {
            method: 'POST',
            body: restaurant_json,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
    };

    static async deleteRestaurant(restaurant_id) {
        await fetch(`http://localhost:8000/api/v1/restaurants/${restaurant_id}`, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
    };
}

export default ShopCmsBackendClient;
