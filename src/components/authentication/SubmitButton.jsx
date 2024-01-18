import Loader from '../common/Loader';

export default function SubmitButton({children, loading}) {
    return (
        <>
            {loading && (
                <Loader/>
            )}
            <div className="mt-4">
                <button type="submit" disabled={loading} className="py-2 px-4 text-center bg-indigo-600 rounded-md w-full text-white text-sm hover:bg-indigo-500">
                    {children}
                </button> 
            </div>
            
            </>

    );
}