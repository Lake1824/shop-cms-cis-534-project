import Product from "@/models/product";
import Category from "@/models/category"

class Menu {
    constructor({restaurant_id = "", name = "", id = "", products = null, categories = null, createdAt = new Date(), updatedAt = new Date()}) {
        this.restaurant_id = restaurant_id;
        this.name = name;
        this.id = id;
        this.products = products;
        this.categories = categories;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromJSON(json) {
        let json_products = json.products;
        let json_categories = json.categories;
        let products = []
        let categories = []

        for (let json_product in json_products) {
            let product = Product.fromJSON(json_products[json_product]);
            products.push(product);
        }

        for (let json_category in json_categories) {
            let category = Category.fromJSON(json_categories[json_category]);
            categories.push(category);
        }

        return new Menu({
            restaurant_id: json.restaurant_id,
            name: json.name,
            id: json.id,
            products: products,
            categories: categories,
            createdAt: json.createdAt,
            updatedAt: json.updatedAt,
        });
    }
}

export default Menu;
