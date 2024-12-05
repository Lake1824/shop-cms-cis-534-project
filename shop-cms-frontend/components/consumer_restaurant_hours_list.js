const Consumer_restaurant_hours_list = ({restaurant_hours=[]} ) => {
    return (
        <div className="text-center col-span-1 bg-white dark:bg-gray-800 min-h-64">
            <a className="text-2xl">Schedule</a>

            <hr/>

            <ul>
                {restaurant_hours.map((restaurant_hour) => {
                    const day_of_week = restaurant_hour['day_of_week'];
                    const opening_time = restaurant_hour['opening'];
                    const closing_time = restaurant_hour['closing'];

                    return (
                        <li
                            className="bg-white dark:bg-gray-800 text-center p-1"
                            key={`${day_of_week} + ${opening_time} + ${closing_time}`}
                        >
                            <a className="font-bold">{day_of_week}:</a> <a>{opening_time} - {closing_time}</a>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default Consumer_restaurant_hours_list;
