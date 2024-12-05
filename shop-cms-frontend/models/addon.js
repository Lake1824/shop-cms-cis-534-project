class Addon {
    constructor({name = "", price = 0.0}) {
        this.name = name;
        this.price = price;
    }

    static fromJSON(json) {
        return new Addon({
            name: json.name,
            price: json.price,
        });
    }
}

export default Addon;
