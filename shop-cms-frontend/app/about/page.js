'use client'

import Consumer_home_nav_bar from "@/components/consumer_home_nav_bar";
import Back_button from "@/components/back_button";

export default function AboutPage() {
    return (
        <div>
            <div className="page-container">
                <Consumer_home_nav_bar/>

                <div className="content">
                    <Back_button/>

                    <div className="min-h-screen flex flex-col justify-center items-center">
                        <a className="text-4xl text-gray-700">Figma Diagrams</a>

                        <img className="p-4 size-3/4" src="/shop-cms-overview.png" alt="Shop CMS Overview"/>

                        <img className="p-4 size-3/4" src="/front-end-architecture.png"
                             alt="Shop CMS Front-End Architecture"/>

                        <img className="p-4 size-3/4" src="/back-end-architecture.png"
                             alt="Shop CMS Back-End Architecture"/>

                        <img className="p-4 size-3/4" src="/back-end-api.png" alt="Shop CMS Back-End API"/>
                    </div>
                </div>
            </div>
        </div>
    );
}