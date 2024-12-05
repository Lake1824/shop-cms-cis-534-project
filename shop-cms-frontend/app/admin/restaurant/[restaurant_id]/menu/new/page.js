'use client'

import {useEffect, useState} from "react";
import Menus from "@/controllers/menus";
import {useParams, useRouter} from "next/navigation";
import Footer from "@/components/footer";
import Admin_home_nav_bar from "@/components/admin_home_nav_bar";
import Back_button from "@/components/back_button";

const AdminNewMenuPage = () => {
    const router = useRouter();

    const {restaurant_id} = useParams();
    const [new_menu, set_new_menu] = useState("");

    const place_holder_menu = JSON.stringify(
        {
            "categories": [
                {
                    "description": "Sweet treats to end your meal.",
                    "name": "Desserts"
                }
            ],
            "name": "Dessert Menu",
            "products": [
                {
                    "add_ons": [
                        {
                            "name": "Vanilla Ice Cream",
                            "price": 1.5
                        },
                        {
                            "name": "Whipped Cream",
                            "price": 0.5
                        }
                    ],
                    "description": "Rich chocolate cake with a molten center.",
                    "menu_category_name": "Desserts",
                    "name": "Chocolate Cake",
                    "price": 6.99
                },
                {
                    "add_ons": [
                        {
                            "name": "Strawberries",
                            "price": 1
                        },
                        {
                            "name": "Caramel Sauce",
                            "price": 0.5
                        }
                    ],
                    "description": "Creamy cheesecake with a graham cracker crust.",
                    "menu_category_name": "Desserts",
                    "name": "Cheesecake",
                    "price": 5.99
                }
            ],
        }, null, 2
    );

    const handleNewMenuSubmission = async (e) => {
        await Menus.createMenuWithMenuJSON(restaurant_id, new_menu);

        router.push('/admin')
    };


    return (
        <div className="page-container">
            <Admin_home_nav_bar/>

            <Back_button/>

            <div className="content">
                <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Create New Menu
                        </label>
                        <textarea
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="new_menu"
                            rows="50"
                            placeholder={place_holder_menu}
                            onChange={(e) => set_new_menu(e.target.value)}
                        />
                    </div>

                    <button
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4"
                        type="submit"
                        onClick={(e) => handleNewMenuSubmission(e)}>
                        Submit
                    </button>
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default AdminNewMenuPage;
