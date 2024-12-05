'use client'

import {useRouter} from "next/navigation";

const Admin_home_nav_bar = () => {
    const router = useRouter();

    const handleLogoutClick = () => {
        router.push('/api/auth/logout');
    };

    const handleLogoButtonClick = () => {
        router.push('/admin');
    }

    return (
        <nav className = "bg-white border-gray-200 dark:bg-gray-900">
            <div className = "max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a
                    className = "flex items-center space-x-3 rtl:space-x-reverse cursor-pointer"
                    type = "button"
                    onClick = {handleLogoButtonClick}
                >
                    <img className = "h-8" src="/restaurant-logo.jpg" alt="Shop CMS Logo"/>
                    <span className = "self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        Yum! Group
                    </span>
                </a>

                <div className = "flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button className = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            type = "button"
                            onClick = {() => handleLogoutClick()}
                    >
                        Logout
                    </button>

                    <button className = "inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            data-collapse-toggle = "navbar-cta"
                            type = "button"
                            aria-controls = "navbar-cta"
                            aria-expanded = "false"
                    >
                        <span className = "sr-only">Open main menu</span>

                        <svg className = "w-5 h-5"
                             aria-hidden = "true"
                             xmlns = "http://www.w3.org/2000/svg"
                             fill = "none"
                             viewBox = "0 0 17 14"
                        >
                            <path stroke = "currentColor"
                                  strokeLinecap = "round"
                                  strokeLinejoin = "round"
                                  strokeWidth = "2"
                                  d = "M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Admin_home_nav_bar;
