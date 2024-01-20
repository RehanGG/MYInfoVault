import { useState } from "react";
import Warning from "../components/common/Warning";
import Success from "../components/common/Success";

export const useMessage = () => {
    const [message, setMessage] = useState();

    let messageContent;

    if(message) {
        switch(message.type) {
            case 'error':
                messageContent = (<Warning>{message.message}</Warning>);
                break;
            case 'success':
                messageContent = (<Success>{message.message}</Success>);
                break;
        }
    }

    return {
        messageContent,
        setMessage
    };

}