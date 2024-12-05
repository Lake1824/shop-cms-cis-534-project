'use client'

import { useUser } from '@auth0/nextjs-auth0/client';
import Footer from "@/components/footer";
import {useEffect, useState} from "react";
import Restaurants from "@/controllers/restaurants";
import Admin_home_nav_bar from "@/components/admin_home_nav_bar";
import Admin_restaurant_table from "@/components/admin_restaurant_table";
import Admin_create_new_restaurant_button from "@/components/admin_create_new_restaurant_button";

export default function AdminRestaurantPage() {
    const {user} = useUser();
    const [restaurants, set_restaurants] = useState([]);

    useEffect(() => {
        Restaurants.getAllRestaurants().then(set_restaurants).catch(console.error);
    }, []);

    if (user) {
        return (
            <div className = "page-container">
                <Admin_home_nav_bar/>

                <div className = "content">
                    <div className = "mt-2 flex justify-end p-4">
                        <Admin_create_new_restaurant_button/>
                    </div>

                    <div className = "p-4">
                        <Admin_restaurant_table restaurants = {restaurants}/>
                    </div>
                </div>

                <Footer/>
            </div>
        );
    }

    return <a href="/api/auth/login">Login</a>;
}
