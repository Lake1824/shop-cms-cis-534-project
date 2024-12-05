'use client'

import {useRouter} from "next/navigation";

const Admin_create_new_restaurant_button = () => {
    const router = useRouter();

    const handleCreateNewRestaurantButtonClick = () => {
        router.push('/admin/restaurant/new')
    }

    return (
        <button
            className = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type = "redirect"
            onClick = {() => {handleCreateNewRestaurantButtonClick()}}
        >
            Create New Restaurant
        </button>
    );
}

export default Admin_create_new_restaurant_button;
