import ShopCmsBackendClient from "@/lib/shop-cms-backend-client";
import Restaurant from "@/models/restaurant";
import Hour from "@/models/hour";

class Restaurants {
    static async getAllRestaurants() {
        let json_restaurants = await ShopCmsBackendClient.getRestaurants();

        if (json_restaurants.length !== 0) {
            return json_restaurants.map(json_restaurant =>
                Restaurant.fromJSON(json_restaurant)
            );
        }

        return [];
    };

    static async getRestaurant(restaurant_id) {
        let json_restaurant = await ShopCmsBackendClient.getRestaurant(restaurant_id);

        if (json_restaurant !== {}) {
            return Restaurant.fromJSON(json_restaurant);
        }

        return {};
    };

    static async SearchForRestaurants(search_query) {
        let json_restaurants = await ShopCmsBackendClient.searchForRestaurants(search_query);

        if (json_restaurants.length !== 0) {
            return json_restaurants.map(json_restaurant =>
                Restaurant.fromJSON(json_restaurant)
            );
        }

        return [];
    };

    static createRestaurant(name, street, city, state, zipcode, facebook_link, instagram_link, x_link, description, hours) {
        let restaurant = new Restaurant({
            name: name || "",
            street: street || "",
            city: city || "",
            state: state ||"",
            zipcode: zipcode ||"",
            facebook_link: facebook_link || "",
            instagram_link: instagram_link || "",
            x_link: x_link || "",
            description: description || "",
            hours: Restaurants.createHours(hours),
            updated_at: new Date(),
            created_at: new Date()
        });

        ShopCmsBackendClient.createRestaurant(restaurant.toJSON());
    }

    static createHours(hours_string){
        if (hours_string.length !== 0){
            const hours_entries = hours_string.split(", ");
            const hours = [];

            for (const hour_entry in hours_entries) {
                const [day_of_week, opening_time_to_closing_time] = hours_entries[hour_entry].split(":");
                const [opening_time, closing_time] = opening_time_to_closing_time.split("-");

                hours.push(new Hour({day_of_week: day_of_week, opening: opening_time, closing: closing_time}));
            }

            return hours;
        }

        return "";
    }

    static getHoursString(formatted_hours){
        let hours_string = ""

        for (const hour in formatted_hours){
            hours_string += `${formatted_hours[hour].day_of_week}:${formatted_hours[hour].opening}-${formatted_hours[hour].closing}, `
        }

        return hours_string.slice(0, -2);
    }

    static deleteRestaurant(restaurant_id) {
        ShopCmsBackendClient.deleteRestaurant(restaurant_id);
    }

    static updateRestaurant(id, name, street, city, state, zipcode, facebook_link, instagram_link, x_link, description, hours) {
        let restaurant = new Restaurant({
            id: id,
            name: name,
            street: street,
            city: city,
            state: state,
            zipcode: zipcode,
            facebook_link: facebook_link,
            instagram_link: instagram_link,
            x_link: x_link,
            description: description,
            hours: Restaurants.createHours(hours),
        });

        ShopCmsBackendClient.updateRestaurant(id, restaurant.toJSON());
    }
}

export default Restaurants;
