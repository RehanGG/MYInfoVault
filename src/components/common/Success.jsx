export default function Success({children}) {
    return (
        <div className="my-2 inline-flex max-w-sm w-full bg-white shadow-md rounded-lg overflow-hidden">
                <div className="flex justify-center items-center w-12 bg-green-500">
                    <svg className="h-6 w-6 fill-current text-white" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z"/>
                    </svg>
                </div>
                
                <div className="-mx-3 py-2 px-4">
                    <div className="mx-3">
                        <span className="text-green-500 font-semibold">Success</span>
                        <p className="text-gray-600 text-sm">{children}</p>
                    </div>
                </div>
        </div>
    );
}