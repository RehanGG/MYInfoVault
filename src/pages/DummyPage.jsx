import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { commonActions } from "../state/common/slice";

export default function DummyPage() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(commonActions.toggleDummyChekcup());
    }, []);

    return (
        <>
        </>
    );
}