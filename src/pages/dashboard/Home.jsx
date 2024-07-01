const roadMap = [
    {name: 'User registration/verification', done: true},
    {name: 'Admin registration/verification', done: true},
    {name: 'Department registration/verification ', done: true},
    {name: 'User view', done: true},
    {name: 'User uploaded functionality', done: true},
    {name: 'Department View', done: true},
    {name: 'Admin View', done: true},
    {name: 'Data Request (from customer data such as health) ', done: true},
    {name: 'User approval (based on requests)', done: true},
    {name: 'Data Settings', done: true},
    {name: 'User assistance', done: true},
    {name: 'Data Scrapping', done: true},
];


export default function HomePage() {
    document.title = 'Dashboard';
    return (       
        <div className="p-6 bg-white rounded-md shadow-md flex flex-col items-center">
            <div className="mb-10 flex flex-col items-center">
                <span className="text-center text-3xl font-semibold">MyInfoVault</span>
                <span className="text-center text-sm">Roadmap to secure information!</span>
            </div>
            <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
                {roadMap.map((val, index) => {
                    if(val.done) {
                        return (<li key={index} className="mb-10 ms-6">            
                                    <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
                                        <svg className="w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                                        </svg>
                                    </span>
                                    <h3 className="font-medium leading-tight">{val.name}</h3>
                                </li>);
                    } else {
                        return (
                            <li key={index} className="mb-10 ms-6">
                                <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                                    <svg className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                        <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z"/>
                                    </svg>
                                </span>
                                <h3 className="font-medium leading-tight">{val.name}</h3>
                            </li>
                         );
                    }
                })}                  
            </ol>
        </div>
    );
}