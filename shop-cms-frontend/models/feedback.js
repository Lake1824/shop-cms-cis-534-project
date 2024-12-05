class Feedback {
    constructor({id = "", comment = "", featured = false, rating = 0, restaurant_id = "", created_at = new Date(), updated_at = new Date()}) {
        this.id = id;
        this.comment = comment;
        this.featured = featured;
        this.rating = rating;
        this.restaurant_id = restaurant_id;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    static fromJSON(json) {
        return new Feedback({
            id: json.id,
            comment: json.comment,
            featured: json.featured,
            rating: json.rating,
            restaurant_id: json.restaurant_id,
            created_at: json.created_at,
            updated_at: json.updated_at,
        });
    }

     toJSON() {
        return JSON.stringify({
            id: this.id,
            comment: this.comment,
            featured: this.featured,
            rating: this.rating,
            restaurant_id: this.restaurant_id,
            created_at: this.created_at,
            updated_at: this.updated_at,
        });
    }
}

export default Feedback;
