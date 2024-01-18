export default function ErrorPage() {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-200 px-6">
            <div className="p-6 max-w-sm w-full bg-white shadow-md rounded-md">
                <div className="flex  flex-col justify-center items-center">
                    <span className="text-gray-700 font-semibold text-6xl">404!</span>
                    <span className="text-2xl">Page not found!</span>
                </div>
            </div>
        </div>
    );
}