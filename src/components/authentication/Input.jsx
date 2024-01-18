import { forwardRef } from "react";
import { useInput } from "../../hooks/useInput";

export default forwardRef(function Input({label, id, type = 'text', disabled = false, defaultValue = '', validations = []}, ref) {
    const {value, onValueChange, changeFocus, error, errorMessage} = useInput(defaultValue, validations);

    let inputClassess = 'form-input mt-1 block w-full rounded-md focus:border-indigo-600';
    if(disabled) {
        inputClassess += ' bg-gray-100';
    }
        
    if(!error && value !== ''){
        ref.current[id] = true;  
    } else {
        ref.current[id] = false;
    }

    return(
        <label htmlFor={id} className="block mb-3">
            <span className="text-gray-700 text-sm">{label}</span>
            <input 
                value={value} 
                disabled={disabled}
                onChange={(event) => onValueChange(event.target.value)} 
                name={id} 
                onBlur={changeFocus}
                type={type}
                className={inputClassess}
                />
           {error &&  <p className="text-sm text-red-500">{errorMessage}</p>}
        </label>
    );
});