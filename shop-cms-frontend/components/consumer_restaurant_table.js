import { useRouter } from 'next/navigation'

const Consumer_restaurant_table = ({ restaurants= [] }) => {
    const router = useRouter();
    const handleRestaurantSelection = (restaurant_id) => {
        router.push(`/restaurant/${restaurant_id}`);
    };

    return (
        <div className="relative overflow-x-auto content-center">
            <a className="text-2xl">All Restaurants</a>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">Name</th>
                    <th scope="col" className="px-6 py-3">Address</th>
                    <th scope="col" className="px-6 py-3">City</th>
                    <th scope="col" className="px-6 py-3">State</th>
                </tr>
                </thead>

                <tbody>
                {restaurants.map((restaurant) => (
                    <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                        key={restaurant.id}
                        onClick={() => handleRestaurantSelection(restaurant.id)}
                    >
                        <td className="px-6 py-4">{restaurant.name}</td>
                        <td className="px-6 py-4">{restaurant.street}</td>
                        <td className="px-6 py-4">{restaurant.city}</td>
                        <td className="px-6 py-4">{restaurant.state}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Consumer_restaurant_table;
