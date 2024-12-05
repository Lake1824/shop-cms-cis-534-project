'use client'

import { useState, useEffect } from "react";
import Consumer_home_nav_bar from "../components/consumer_home_nav_bar";
import Restaurant_search_bar from "../components/restaurant_search_bar";
import Consumer_restaurant_table from "../components/consumer_restaurant_table";
import Restaurants from "@/controllers/restaurants";
import Footer from "../components/footer";
import Restaurant_search_results_list from "@/components/restaurant_search_results_list";

export default function Home() {
    const [restaurants, set_restaurants] = useState([]);
    const [restaurant_search_results, set_restaurant_search_results] = useState([]);

    useEffect(() => {
        Restaurants.getAllRestaurants().then(set_restaurants).catch(console.error);
    }, []);

    const handleRestaurantSearch = (restaurant_query_term) => {
        Restaurants.SearchForRestaurants(restaurant_query_term).then(set_restaurant_search_results).catch(console.error);
    };

    return (
        <div className="page-container">
            <Consumer_home_nav_bar/>

            <div className="content">
                <div className="mt-20">
                    <Restaurant_search_bar on_restaurant_search={handleRestaurantSearch}/>
                    <Restaurant_search_results_list restaurants={restaurant_search_results}/>
                </div>

                <div className="p-10">
                    <Consumer_restaurant_table restaurants={restaurants}/>
                </div>
            </div>

            <Footer/>
        </div>
    );
}
