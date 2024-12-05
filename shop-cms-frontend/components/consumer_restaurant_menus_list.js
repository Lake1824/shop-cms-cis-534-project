import {useRouter} from "next/navigation";


const Consumer_restaurant_menus_list = ({restaurant_menus = [], restaurant_id} ) => {
    const router = useRouter();
    const handleMenuSelection = (menu_id) => {
        router.push(`/restaurant/${restaurant_id}/menu/${menu_id}`);
    };

    return (
        <div className="bg-white rounded-lg shadow dark:bg-gray-900 w-full max-w-screen-xl mx-auto p-4 md:py-8 text-center">
            <a className="text-3xl text-white "> Menus </a>

            <hr/>

            <ul>
                {restaurant_menus.map((menu) => {
                    return (
                        <li
                            className="bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-center p-4 text-2xl rounded-lg mt-5 cursor-pointer"
                            key={menu.id}
                            onClick={() => handleMenuSelection(menu.id)}
                        >
                            {menu.name}
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default Consumer_restaurant_menus_list;