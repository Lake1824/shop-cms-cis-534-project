import Hour from "@/models/hour";

class Restaurant {constructor({name = "", street = "", city = "", state = "", zipcode = "", id = "", description = "", facebook_link = "", x_link = "", instagram_link = "", hours = null, created_at = new Date(), updated_at = new Date()})
{
        this.name = name;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zipcode = zipcode;
        this.id = id;
        this.description = description;
        this.facebook_link = facebook_link;
        this.x_link = x_link;
        this.instagram_link = instagram_link;
        this.hours = hours;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    static fromJSON(json) {
        let json_hours = json.hours;
        let hours = []

        for (let json_hour in json_hours) {
            let hour = Hour.fromJSON(json_hours[json_hour]);
            hours.push(hour);
        }

        return new Restaurant({
            name: json.name,
            street: json.street,
            city: json.city,
            state: json.state,
            zipcode: json.zipcode,
            id: json.id,
            description: json.description,
            facebook_link: json.facebook_link,
            x_link: json.x_link,
            instagram_link: json.instagram_link,
            hours: hours,
            created_at: json.created_at,
            updated_at: json.updated_at,
        });
    }

    toJSON() {
        return JSON.stringify({
            name: this.name,
            street: this.street,
            city: this.city,
            state: this.state,
            zipcode: this.zipcode,
            id: this.id,
            description: this.description,
            facebook_link: this.facebook_link,
            x_link: this.x_link,
            instagram_link: this.instagram_link,
            hours: Restaurant.hoursToJson(this.hours),
            created_at: this.created_at,
            updated_at: this.updated_at,
        });
    }

    static hoursToJson(hours){
        let hours_json = [];

        for (const hour of hours){
            hours_json.push(
                {
                    opening: hour.opening,
                    closing: hour.closing,
                    day_of_week: hour.day_of_week,
                }
            )
        }

        return hours_json
    }
}

export default Restaurant;
