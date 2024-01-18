import safeIcon from '../../assets/safe.png';

export default function Header() {
    return (
        <header className="flex items-center justify-center px-6 py-4 bg-white border-b-2 border-indigo-600">
            <span className='w-12 px-3'><img src={safeIcon} /></span>
            <span className="font-semibold">Your information is secure with us!</span>
        </header>
    );
}