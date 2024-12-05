const Consumer_restaurant_featured_feedback = ({featured_feedback = []} ) => {
    return (
        <div className="text-center col-span-1 bg-white dark:bg-gray-800 min-h-64">
            <div className="text-center text-3xl text-white">
                <a> Featured Feedback </a>
            </div>

            <hr/>

            <ul>
                {featured_feedback.map((feedback) => {
                    return (
                        <li
                            className="bg-white dark:bg-gray-800 dark:border-gray-700 p-4 text-xl border border-solid border-white"
                            key = {feedback.id}
                        >
                            <div>
                                <div>
                                    <a> Rating: {feedback.rating} </a>
                                </div>

                                <div>
                                    <a> {feedback.comment} </a>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default Consumer_restaurant_featured_feedback;
