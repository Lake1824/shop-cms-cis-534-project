class Category {
    constructor({name = "", description = ""}) {
        this.name = name;
        this.description = description;
    }

    static fromJSON(json) {
        return new Category({
            name: json.name,
            description: json.description,
        });
    }
}

export default Category;
