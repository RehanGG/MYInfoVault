import { useEffect, useState } from "react";
import NamesCache from "../../utils/cache-data";

export default function RequestName({userId}) {
    const [name, setName] = useState(null);
    const [loading, setLoading] = useState(true);
    const namesCache = new NamesCache();
    

    useEffect(() => {
       namesCache.getUserName(userId).then((name) => {
        setName(name);
        setLoading(false);
       });
        
    }, []);

    return (
        <>
            {loading && <></>}
            {!loading && <p>{name}</p>}
        </>
    );

}