const Consumer_restaurant_location = ({restaurant_street, restaurant_city, restaurant_state, restaurant_zipcode} ) => {
    return (
        <div className="text-center col-span-1 bg-white dark:bg-gray-800 min-h-64">
            <a className="text-2xl">Location</a>
            <hr/>
            <ul className="mt-4">
                <li>
                    <a className="font-bold"> Street: </a> <a> {restaurant_street} </a>
                </li>

                <li className="mt-4">
                    <a className="font-bold"> City: </a> <a> {restaurant_city} </a>
                </li>

                <li className="mt-4">
                    <a className="font-bold"> State: </a> <a> {restaurant_state} </a>
                </li>

                <li className="mt-4">
                    <a className="font-bold"> Zipcode: </a> <a> {restaurant_zipcode} </a>
                </li>
            </ul>
        </div>
    )
}

export default Consumer_restaurant_location;