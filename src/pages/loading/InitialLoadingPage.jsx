import classes from './Loader.module.css';

export default function InitialLoadingPage() {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-200 px-6">
            <div className="flex  flex-col justify-center items-center">
                <div className={classes.loader}>
                    <div className={classes['loader-square']}></div>
                    <div className={classes['loader-square']}></div>
                    <div className={classes['loader-square']}></div>
                    <div className={classes['loader-square']}></div>
                    <div className={classes['loader-square']}></div>
                    <div className={classes['loader-square']}></div>
                    <div className={classes['loader-square']}></div>
                </div>
            </div>
        </div>
    );
}