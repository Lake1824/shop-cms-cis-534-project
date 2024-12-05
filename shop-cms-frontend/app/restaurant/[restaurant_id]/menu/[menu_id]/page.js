'use client'

import {useEffect, useState} from "react";
import Menus from "@/controllers/menus";
import {useParams} from "next/navigation";
import Consumer_home_nav_bar from "@/components/consumer_home_nav_bar";
import Footer from "@/components/footer";
import Consumer_menu from "@/components/consumer_menu";

const MenuPage = () => {
    const {menu_id} = useParams();
    const [menu, set_menu] = useState({});

    useEffect(() => {
        Menus.getMenu(String(menu_id)).then(set_menu).catch(console.error);
    }, [String(menu_id)]);


    return (
        <div className="page-container">
            <Consumer_home_nav_bar/>

            <div className="content">
                <Consumer_menu menu={menu}/>
            </div>

            <Footer/>
        </div>
    );
};

export default MenuPage;