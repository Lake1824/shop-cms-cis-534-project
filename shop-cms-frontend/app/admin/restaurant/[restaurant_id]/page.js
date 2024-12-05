'use client'

import Footer from "@/components/footer";
import Admin_home_nav_bar from "@/components/admin_home_nav_bar";
import {useEffect, useState} from "react";
import Back_button from "@/components/back_button";
import Restaurants from "@/controllers/restaurants";
import {useParams, useRouter} from "next/navigation";
import Feedbacks from "@/controllers/feedbacks";
import Admin_menu_table from "@/components/admin_menu_table";
import Menus from "@/controllers/menus";

export default function AdminEditRestaurantPage() {
    const router = useRouter();

    const {restaurant_id} = useParams();
    const [restaurant_name, set_restaurant_name] = useState("");
    const [street, set_street] = useState("");
    const [city, set_city] = useState("");
    const [state, set_state] = useState("");
    const [zipcode, set_zipcode] = useState("");
    const [facebook_link, set_facebook_link] = useState("");
    const [instagram_link, set_instagram_link] = useState("");
    const [x_link, set_x_link] = useState("");
    const [description, set_description] = useState("");
    const [all_feedbacks, set_all_feedbacks] = useState([]);
    const [menus, set_menus] = useState([]);
    let   [hours, set_hours] = useState("");

    useEffect(() => {
        Restaurants.getRestaurant(String(restaurant_id)).then((data) => {
            set_restaurant_name(data.name);
            set_street(data.street);
            set_city(data.city);
            set_state(data.state);
            set_zipcode(data.zipcode);
            set_facebook_link(data.facebook_link);
            set_instagram_link(data.instagram_link);
            set_x_link(data.x_link);
            set_description(data.description);
            set_hours(Restaurants.getHoursString(data.hours));
        }).catch(console.error);

        Feedbacks.getAllRestaurantFeedback(String(restaurant_id)).then(set_all_feedbacks).catch(console.error);
        Menus.getAllMenus(String(restaurant_id)).then(set_menus).catch(console.error);
    }, [String(restaurant_id)]);

    const handleRestaurantUpdateSubmitClick = async (e) => {
        e.preventDefault();
        await Restaurants.updateRestaurant(
            restaurant_id,
            restaurant_name,
            street,
            city,
            state,
            zipcode,
            facebook_link,
            instagram_link,
            x_link,
            description,
            hours
        );

        router.push('/admin')
    };

    const handleNewMenuButtonClick = async (e) => {
        router.push(`/admin/restaurant/${restaurant_id}/menu/new`);
    }

    const FeedbackFeatureChangeSelection = async (feedback_id, changed_featured_status, e) => {
        e.preventDefault();
        await Feedbacks.updateFeedbackFeaturedStatus(feedback_id, changed_featured_status);
    }

    return (
        <div className = "page-container">
            <Admin_home_nav_bar/>

            <Back_button/>

            <div className="content">
                <form className="w-full max-w-screen-xl mx-auto p-4 md:py-8"
                      onSubmit={handleRestaurantUpdateSubmitClick}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Restaurant Name
                            </label>

                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="restaurant_name"
                                type="name"
                                required
                                value={restaurant_name}
                                onChange={(e) => set_restaurant_name(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Street
                            </label>

                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="street"
                                type="text"
                                placeholder="216 Best Food Ave"
                                value={street}
                                onChange={(e) => set_street(e.target.value)}
                            />
                        </div>

                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                City
                            </label>

                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="city"
                                type="text"
                                placeholder="Cleveland"
                                value={city}
                                onChange={(e) => set_city(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                State
                            </label>

                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="state"
                                type="text"
                                placeholder="Ohio"
                                value={state}
                                onChange={(e) => set_state(e.target.value)}
                            />
                        </div>

                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Zipcode
                            </label>

                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="zipcode"
                                type="text"
                                placeholder="44101"
                                value={zipcode}
                                onChange={(e) => set_zipcode(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Facebook Link
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="facebbok_link"
                                type="text"
                                placeholder="https://www.facebook.com/..."
                                value={facebook_link}
                                onChange={(e) => set_facebook_link(e.target.value)}
                            />
                        </div>

                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Instagram Link
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="instagram_link"
                                type="text"
                                placeholder="https://www.instagram.com/..."
                                value={instagram_link}
                                onChange={(e) => set_instagram_link(e.target.value)}
                            />
                        </div>

                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                X Link
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="x_link"
                                type="text"
                                placeholder="https://www.x.com/..."
                                value={x_link}
                                onChange={(e) => set_x_link(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Description
                            </label>
                            <textarea
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="description"
                                rows="6"
                                placeholder="This is a great pizza parlor."
                                value={description}
                                onChange={(e) => set_description(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Hours
                            </label>

                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="restaurant_hours"
                                type="hours"
                                placeholder="Monday:900-1700, Tuesday:900-1700, ..."
                                value={hours}
                                onChange={(e) => set_hours(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>

                <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                    <a className="text-xs text-gray-700 uppercase font-bold">All Feedback</a>

                    <table className="w-full text-xs text-left rtl:text-right text-gray-700 uppercase">
                        <thead
                            className="text-xs uppercase text-gray-700 bg-gray-200 border-b">
                        <tr>
                            <th scope="col" className="px-6 py-3">Rating</th>
                            <th scope="col" className="px-6 py-3">Comment</th>
                            <th scope="col" className="px-6 py-3">Featured?</th>
                        </tr>
                        </thead>

                        <tbody>
                        {all_feedbacks.map((feedback) => (
                            <tr
                                className="text-gray-700 bg-gray-200 border-b"
                                key={feedback.id}
                            >
                                <td className="px-6 py-4">{feedback.rating}</td>
                                <td className="px-6 py-4">{feedback.comment}</td>

                                <td className="px-6 py-4">
                                    <input
                                        id="checked-checkbox"
                                        type="checkbox"
                                        checked={feedback.featured}
                                        onChange={(e) => FeedbackFeatureChangeSelection(feedback.id, !feedback.featured, e)}
                                        className="w-4 h-4 rounded"
                                    />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                    <Admin_menu_table menus={menus} restaurant_id={restaurant_id}/>

                    <button
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4"
                        type="new_menu"
                        onClick={(e) => handleNewMenuButtonClick(e)}
                    >
                        New Menu
                    </button>
                </div>

            </div>
            <Footer/>
        </div>
    );
}
