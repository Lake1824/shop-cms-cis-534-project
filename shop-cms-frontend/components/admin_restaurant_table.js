import { useRouter } from 'next/navigation'
import Restaurants from "@/controllers/restaurants";

const Admin_restaurant_table = ({ restaurants= [] }) => {
    const router = useRouter();

    const handleEditRestaurantButtonClick = (restaurant_id) => {
        router.push(`/admin/restaurant/${restaurant_id}`);
    };

    const handleDeleteRestaurantButtonClick = async (restaurant_id) => {
        Restaurants.deleteRestaurant(restaurant_id);
    };

    return (
        <div className = "relative overflow-x-auto content-center">
            <a className = "text-2xl text-gray-700 uppercase font-bold">All Restaurants</a>

            <table className = "w-full text-sm text-left rtl:text-right text-gray-700 uppercase">
                <thead className = "text-xs uppercase text-gray-700 bg-gray-200">
                <tr>
                    <th scope = "col" className = "px-6 py-3">Name</th>
                    <th scope = "col" className = "px-6 py-3">Address</th>
                    <th scope = "col" className = "px-6 py-3">City</th>
                    <th scope = "col" className = "px-6 py-3">State</th>
                    <th scope = "col" className = "px-6 py-3">Edit</th>
                    <th scope = "col" className = "px-6 py-3">Delete</th>
                </tr>
                </thead>

                <tbody>
                {restaurants.map((restaurant) => (
                    <tr
                        className = "text-gray-700 bg-gray-200 border-b"
                        key = {restaurant.id}
                    >
                        <td className = "px-6 py-4">{restaurant.name}</td>
                        <td className = "px-6 py-4">{restaurant.street}</td>
                        <td className = "px-6 py-4">{restaurant.city}</td>
                        <td className = "px-6 py-4">{restaurant.state}</td>

                        <td className = "px-6 py-4">
                            <button
                                className = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md sm:w-auto px-1 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                type = "redirect"
                                onClick = {() => {
                                    handleEditRestaurantButtonClick(restaurant.id)
                                }}
                            >
                                Edit
                            </button>
                        </td>

                        <td className = "px-6 py-4">
                            <button
                                className = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md sm:w-auto px-1 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                type = "redirect"
                                onClick = {() => {
                                    handleDeleteRestaurantButtonClick(restaurant.id)
                                }}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Admin_restaurant_table;
