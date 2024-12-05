import ShopCmsBackendClient from "@/lib/shop-cms-backend-client";
import Menu from "@/models/menu";
import Product from "@/models/product"

class Menus {
    static async getAllMenus(restaurant_id) {
        let json_menus = await ShopCmsBackendClient.getMenus(restaurant_id);

        if (json_menus.length !== 0) {
            return json_menus.map(json_menu =>
                Menu.fromJSON(json_menu)
            );
        }

        return [];
    };

    static async getMenu(menu_id) {
        let json_menu = await ShopCmsBackendClient.getMenu(menu_id);

        if (json_menu !== {}) {
            return Menu.fromJSON(json_menu);
        }

        return {};
    };

    static async getMenuInJsonStringFormat(menu_id){
        let json_menu = await ShopCmsBackendClient.getMenu(menu_id);
        if (json_menu !== {}) {
            return JSON.stringify(json_menu, null, 2);
        }

        return "";
    }

    static async deleteMenu(menu_id) {
        await ShopCmsBackendClient.deleteMenu(menu_id);
    };

    static async updateMenuWithMenuJSON(menu_id, menu_json) {
        await ShopCmsBackendClient.updateMenu(menu_id, menu_json);
    }

    static async createMenuWithMenuJSON(restaurant_id, menu_json) {
        let parsed_menu_json = JSON.parse(menu_json);
        parsed_menu_json.restaurant_id = restaurant_id;
        await ShopCmsBackendClient.createMenu(JSON.stringify(parsed_menu_json));
    }

    static async SearchForRestaurantProducts(restaurant_id, search_query) {
        let json_menus_products = await ShopCmsBackendClient.searchForRestaurantProducts(restaurant_id, search_query);

        if (json_menus_products.length !== 0) {
            return json_menus_products.map(json_menu_product => ({
                [json_menu_product.menu_id]: Product.fromJSON(json_menu_product.product),
            }));
        }

        return [];
    }

    static getProductsForCategory(products, category_name) {
        return products.filter(product => product.menu_category_name === category_name);
    }

    static getAddonsInAString(addons) {
        let addonsString = ""
        for (let addon of addons) {
            addonsString +=`${addon.name}: $${addon.price}, `
        }

        return addonsString.slice(0, -2);
    }
}

export default Menus;