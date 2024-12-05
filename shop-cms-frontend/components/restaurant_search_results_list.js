import {useRouter} from "next/navigation";

const Restaurant_search_results_list = ({restaurants=[]} ) => {
    const router = useRouter();
    const handleSearchResultClick = (id) => {
        router.push(`/restaurant/${id}`);
    };

    return (
        <ul className="max-w-96 mx-auto mt-5">
            {restaurants.map((restaurant) => (
                <li className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer text-center rounded-full p-2"
                    key={restaurant.id}
                    onClick={() => handleSearchResultClick(restaurant.id)}
                >
                    {restaurant.name}
                </li>
            ))}
        </ul>
    );
};

export default Restaurant_search_results_list;
