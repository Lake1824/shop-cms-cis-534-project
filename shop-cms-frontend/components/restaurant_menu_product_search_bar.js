'use client'

import React, { useState } from 'react';

const Restaurant_menu_product_search_bar = ({ on_product_search }) => {
    const [search_query, set_search_query] = useState('');

    const handleSearchButtonClick = (event) => {
        event.preventDefault();
        on_product_search(search_query);
    };

    return (
        <form className="max-w-2xl mx-auto">
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                   htmlFor="default-search"
            >
                Search
            </label>

            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400"
                         aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg"
                         fill="none"
                         viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round" strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </div>

                <input className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       type="search"
                       id="default-search"
                       value={search_query}
                       onChange={(e) => set_search_query(e.target.value)}
                       placeholder="Search Products"
                       required
                />

                <button
                    className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="submit"
                    onClick={handleSearchButtonClick}
                >
                    Search
                </button>
            </div>
        </form>
    );
};

export default Restaurant_menu_product_search_bar;
