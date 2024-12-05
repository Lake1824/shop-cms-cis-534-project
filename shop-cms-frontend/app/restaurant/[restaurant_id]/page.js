'use client'

import Consumer_home_nav_bar from "@/components/consumer_home_nav_bar";
import Footer from "@/components/footer";
import {useEffect, useState} from "react";
import Restaurants from "@/controllers/restaurants";
import Menus from "@/controllers/menus";
import Consumer_restaurant_hours_list from "@/components/consumer_restaurant_hours_list";
import Consumer_restaurant_menus_list from "@/components/consumer_restaurant_menus_list";
import Consumer_restaurant_description from "@/components/consumer_restaurant_description";
import Restaurant_menu_product_search_bar from "@/components/restaurant_menu_product_search_bar";
import Restaurant_menu_product_search_results_list from "@/components/restaurant_menu_product_search_results_list";
import {useParams} from "next/navigation";
import Consumer_restaurant_name from "@/components/consumer_restaurant_name";
import Consumer_restaurant_location from "@/components/consumer_restaurant_location";
import Consumer_restaurant_social_links from "@/components/consumer_restaurant_social_links";
import Back_button from "@/components/back_button";
import Consumer_restaurant_featured_feedback from "@/components/consumer_restaurant_featured_feedback";
import Feedbacks from "@/controllers/feedbacks";
import Consumer_restaurant_feedback_entry from "@/components/consumer_restaurant_feedback_entry";


const RestaurantPage = () => {
    const {restaurant_id} = useParams();
    const [restaurant, set_restaurant] = useState({});
    const [menus, set_menus] = useState([]);
    const [product_results, set_product_search_results] = useState([]);
    const [featured_feedback, set_featured_feedback] = useState([]);

    useEffect(() => {
        Restaurants.getRestaurant(String(restaurant_id)).then(set_restaurant).catch(console.error);
        Menus.getAllMenus(String(restaurant_id)).then(set_menus).catch(console.error);
        Feedbacks.getFeaturedFeedback(String(restaurant_id)).then(set_featured_feedback).catch(console.error);
    }, [String(restaurant_id)]);

    const handleProductSearch = (product_query_term) => {
        Menus.SearchForRestaurantProducts(restaurant_id, product_query_term).then(set_product_search_results).catch(console.error);
    };

    return (
        <div className="page-container">
            <Consumer_home_nav_bar/>

            <div className="content">
                <Back_button/>

                <Consumer_restaurant_name restaurant_name={restaurant.name}/>

                <div className="mt-20">
                    <Restaurant_menu_product_search_bar on_product_search={handleProductSearch}/>
                    <Restaurant_menu_product_search_results_list menus_products={product_results}
                                                                 restaurant_id={restaurant_id}/>
                </div>

                <div className="p-10">
                    <Consumer_restaurant_menus_list restaurant_menus={menus} restaurant_id={restaurant_id}/>
                </div>

                <div className="grid grid-cols-4 grid-rows-1 gap-3  min-h-48 p-5">
                    <Consumer_restaurant_hours_list restaurant_hours={restaurant.hours}/>
                    <Consumer_restaurant_location restaurant_street={restaurant.street} restaurant_city={restaurant.city}
                                                  restaurant_state={restaurant.state}
                                                  restaurant_zipcode={restaurant.zipcode}/>
                    <Consumer_restaurant_description restaurant_description={restaurant.description}/>
                    <Consumer_restaurant_social_links restaurant_name={restaurant.name}
                                                      restaurant_facebook_link={restaurant.facebook_link}
                                                      restaurant_x_link={restaurant.x_link}
                                                      restaurant_instagram_link={restaurant.instagram_link}/>
                </div>

                <div className="grid grid-cols-2 grid-rows-1 gap-3  min-h-48 p-5">
                    <Consumer_restaurant_featured_feedback featured_feedback={featured_feedback}/>
                    <Consumer_restaurant_feedback_entry restaurant_id={restaurant_id}/>
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default RestaurantPage;