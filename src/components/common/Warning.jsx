export default function Warning({children}) {
    return (
        <div className="my-2 inline-flex max-w-sm w-full bg-white shadow-md rounded-lg overflow-hidden">
            <div className="flex justify-center items-center w-12 bg-yellow-500">
                <svg className="h-6 w-6 fill-current text-white" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z"/>
                </svg>
            </div>
            
            <div className="-mx-3 py-2 px-4">
                <div className="mx-3">
                    <span className="text-yellow-500 font-semibold">Warning</span>
                    <p className="text-gray-600 text-sm">{children}</p>
                </div>
            </div>
        </div>
    );
}