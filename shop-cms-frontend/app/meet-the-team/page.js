'use client'

import Consumer_home_nav_bar from "@/components/consumer_home_nav_bar";
import Back_button from "@/components/back_button";

export default function MeetTheTeamPage() {
    return (
        <div>
            <div className="page-container">
                <Consumer_home_nav_bar/>

                <div className="content">
                    <Back_button/>

                    <div className="min-h-screen flex flex-col justify-center items-center">
                        <a className="text-4xl text-gray-700">Shop CMS Development Team</a>

                        <img className="p-4 size-1/4" src="/matthew-pfp.jpg" alt="@Lake1824"/>
                        <a className="text-xl text-gray-700">@Lake1824</a>
                        <a className="text-xl text-gray-700">Matthew Lake</a>

                        <img className="p-4 size-1/4" src="/azamat-pfp.jpg" alt="@azakg"/>
                        <a className="text-xl text-gray-700">@azakg</a>
                        <a className="text-xl text-gray-700">Azamat Apsamatov</a>

                        <img className="p-4 size-1/4" src="/domenic-pfp.png" alt="@dmticc"/>
                        <a className="text-xl text-gray-700">@dmticc</a>
                        <a className="text-xl text-gray-700">Domenic Ticchione</a>
                    </div>
                </div>
            </div>
        </div>
    );
}