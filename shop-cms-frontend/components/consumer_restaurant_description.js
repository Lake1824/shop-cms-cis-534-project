const Consumer_restaurant_description = ({restaurant_description} ) => {
    return (
        <div className="text-center col-span-1 bg-white dark:bg-gray-800 min-h-64">
            <a className="text-2xl text-white"> Restaurant Description </a>

            <hr/>

            <div className="text-white mt-4">
                <a> {restaurant_description} </a>
            </div>
        </div>
    )
}

export default Consumer_restaurant_description;