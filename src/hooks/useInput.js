import { useState } from "react";

export const useInput = (defaultValue, validations = []) => {
    const [value, setValue] = useState(defaultValue);
    const [focus, setFocus] = useState(false);

    let error = false;
    let errorMessage = '';

    if (focus && value !== null && value !== undefined) {
        for(const validation of validations) {
            const fn = validation.errorFn;
            const message = validation.message;
            const validate = fn(value);
            if(validate) {
                error = true;
                errorMessage = message;
                break;
            }
        }
    }

    function onValueChange(value) {
        setValue(value);
        setFocus(false);
    }

    function changeFocus() {
        setFocus(true);
    }

    return {
        value,
        onValueChange,
        changeFocus,
        setValue,
        error,
        errorMessage,
    };
};