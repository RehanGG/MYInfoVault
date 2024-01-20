import { forwardRef } from "react";
import { useInput } from "../../hooks/useInput";



export default forwardRef(function ImageInput ({label, id, disabled = false, validations = [], height = '120px', width = '120px', initialImg}, ref) {
    const {value, setValue, error, errorMessage} = useInput(undefined, validations); 

    if(ref) {
        if(!error && value !== undefined){
            ref.current[id] = true;
        } else {
            ref.current[id] = false;
        }
    }
 
    function handleSelectImage(event) {       
        setValue(event.target.files[0]);
    }

    const generateImgUrl = () => {
        if(value) {
            return URL.createObjectURL(value);
        } 
        return initialImg || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png';
    }

    return (
        <>
            <label htmlFor={id} className="flex flex-col items-center my-5">
                <div style={{ height: height, width: width }} className="rounded-full overflow-hidden">
                    <img style={{ width: "100%", height: "100%", objectFit: "cover" }} src={generateImgUrl()} alt="" />
                </div>
                    {(!value && !initialImg) && <span className="text-gray-800 text-sm">{label}</span>}
                    {error && <p className="text-sm text-red-500">{errorMessage}</p>}
                </label>
            <input
                type="file"
                id={id}
                name={id}
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleSelectImage}
                disabled={disabled}
            />
        </>
    );
})