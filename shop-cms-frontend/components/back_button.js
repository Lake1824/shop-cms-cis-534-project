import {useRouter} from "next/navigation";

const Back_button = () => {
    const router = useRouter();
    const onBackButtonClick = () => {
        router.back();
    }

    return (
        <div className="ml-2 mt-2 cursor-pointer">
            <a
                className="inline-flex items-center bg-blue-700 hover:bg-blue-800 px-3 py-1.5 rounded-md text-white"
                onClick={() => {
                    onBackButtonClick()
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                     className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M7 16l-4-4m0 0l4-4m-4 4h18">
                    </path>
                </svg>
                <span className="ml-1 font-bold text-md">Back</span>
            </a>
        </div>
    );
}
export default Back_button;