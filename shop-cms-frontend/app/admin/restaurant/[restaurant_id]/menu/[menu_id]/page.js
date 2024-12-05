'use client'

import {useEffect, useState} from "react";
import Menus from "@/controllers/menus";
import {useParams, useRouter} from "next/navigation";
import Footer from "@/components/footer";
import Admin_home_nav_bar from "@/components/admin_home_nav_bar";

const AdminEditMenuPage = () => {
    const router = useRouter();

    const {menu_id} = useParams();
    const [menu, set_menu] = useState("");

    useEffect(() => {
        Menus.getMenuInJsonStringFormat(String(menu_id)).then(set_menu).catch(console.error);
    }, [String(menu_id)]);

    const handleEditMenuSubmission = async (e) => {
        e.preventDefault();
        await Menus.updateMenuWithMenuJSON(menu_id, menu);

        router.push('/admin')
    };


    return (
        <div className="page-container">
            <Admin_home_nav_bar/>

            <div className="content">
                <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Menu
                        </label>
                        <textarea
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="edit_menu"
                            rows="50"
                            value={menu}
                            onChange={(e) => set_menu(e.target.value)}
                        />
                    </div>

                    <button
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4"
                        type="submit"
                        onClick={(e) => handleEditMenuSubmission(e)}>
                        Submit
                    </button>
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default AdminEditMenuPage;
