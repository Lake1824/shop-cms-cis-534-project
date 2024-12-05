import {useState} from "react";
import Feedbacks from "@/controllers/feedbacks";

const Consumer_restaurant_feedback_entry = ({restaurant_id}) => {
    const [rating, set_rating_name] = useState("");
    const [feedback, set_feedback] = useState("");

    const handleFeedbackSubmitClick = async (e) => {
        e.preventDefault();
        await Feedbacks.createFeedback(restaurant_id, rating, feedback);
        set_rating_name("");
        set_feedback("");
    };

    return (
        <div className = "text-center col-span-1 bg-white dark:bg-gray-800 min-h-80">
            <div className = "text-center text-3xl text-white">
                <a> Leave Feedback </a>
            </div>

            <hr/>

            <div>
                <form className = "max-w-sm mx-auto" onSubmit = {handleFeedbackSubmitClick}>
                    <label className = "block text-sm font-medium text-gray-900 dark:text-white mt-2">
                        Select a rating and leave a comment:
                    </label>

                    <input
                        className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type = "number"
                        id = "rating_input"
                        min = "0"
                        max = "5"
                        placeholder = "5"
                        required
                        value = {rating}
                        onChange = {(e) => set_rating_name(e.target.value)}
                    />

                    <textarea
                        className = "block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2"
                        id = "feedback_entry"
                        rows = "4"
                        placeholder = "Leave a comment..."
                        required
                        value = {feedback}
                        onChange = {(e) => set_feedback(e.target.value)}
                    />

                    <button
                        className = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4"
                        type = "submit"
                    >
                        Submit
                    </button>
                </form>
            </div>

        </div>
    )
}

export default Consumer_restaurant_feedback_entry;
