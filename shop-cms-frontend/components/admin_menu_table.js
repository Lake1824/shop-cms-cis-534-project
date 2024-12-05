import { useRouter } from 'next/navigation'
import Menus from "@/controllers/menus";

const Admin_menu_table = ({ menus= [], restaurant_id }) => {
    const router = useRouter();

    const handleEditMenuButtonClick = (menu_id) => {
        router.push(`/admin/restaurant/${restaurant_id}/menu/${menu_id}`);
    };

    const handleDeleteMenuButtonClick = async (menu_id) => {
        await Menus.deleteMenu(menu_id);
    };

    return (
        <div className = "relative overflow-x-auto content-center">
            <a className = "text-xs text-gray-700 uppercase font-bold">All Menus</a>

            <table className = "w-full text-xs text-left rtl:text-right text-gray-700 uppercase">
                <thead className = "text-xs uppercase text-gray-700 bg-gray-200 border-b">
                <tr>
                    <th scope = "col" className = "px-6 py-3">Name</th>
                    <th scope = "col" className = "px-6 py-3">Edit</th>
                    <th scope = "col" className = "px-6 py-3">Delete</th>
                </tr>
                </thead>

                <tbody>
                {menus.map((menu) => (
                    <tr
                        className = "text-gray-700 bg-gray-200 border-b"
                        key = {menu.id}
                    >
                        <td className = "px-6 py-4">{menu.name}</td>

                        <td className = "px-6 py-4">
                            <button
                                className = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md sm:w-auto px-1 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                type = "redirect"
                                onClick = {() => {
                                    handleEditMenuButtonClick(menu.id)
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
                                    handleDeleteMenuButtonClick(menu.id)
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

export default Admin_menu_table;
