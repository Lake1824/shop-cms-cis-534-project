'use client'

import {useRouter} from "next/navigation";

const Restaurant_menu_product_search_results_list = ({menus_products=[], restaurant_id} ) => {
    const router = useRouter();
    const handleSearchResultClick = (menu_id) => {
        router.push(`/restaurant/${restaurant_id}/menu/${menu_id}`);
    };

    return (
        <ul className="max-w-96 mx-auto mt-5">
            {menus_products.map((menu_product) => {
                const menu_id = Object.keys(menu_product)[0];
                const product = menu_product[menu_id];

                return (
                    <li
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer text-center rounded-full p-2"
                        key={menu_id}
                        onClick={() => handleSearchResultClick(menu_id)}
                    >
                        {product.name}
                    </li>
                );
            })}
        </ul>
    );
};

export default Restaurant_menu_product_search_results_list;