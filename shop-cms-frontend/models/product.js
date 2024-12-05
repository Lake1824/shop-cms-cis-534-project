import Addon from "@/models/addon";

class Product {
    constructor({name = "", description = "", price = 0.0, menu_category_name = "", addons = null}) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.menu_category_name = menu_category_name;
        this.addons = addons;
    }

    static fromJSON(json) {
        let json_addons = json.add_ons;
        let addons = []

        for (let json_addon in json_addons) {
            let addon = Addon.fromJSON(json_addons[json_addon]);
            addons.push(addon);
        }

        return new Product({
            name: json.name,
            description: json.description,
            price: json.price,
            menu_category_name: json.menu_category_name,
            addons: addons,
        });
    }
}

export default Product;
