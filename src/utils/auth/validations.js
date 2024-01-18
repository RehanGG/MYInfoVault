export const imageValidations = [
    {
        errorFn: (value) => {
            return value.length === undefined;
        },
        message: 'Image is required'
    }
];
export const fullNameValidations = [
    {
        errorFn: (value) => {
            return value.length < 1;
        },
        message: 'Your full name is required'
    },
    {
        errorFn: (value) => {
            return value.length < 4;
        },
        message: 'Minimum 4 characters are required'
    },
    {
        errorFn: (value) => {
            const check = /^[A-Za-z\s\'\-]+$/.test(value);
            return !check;
        },
        message: 'Please enter valid name'
    },

];

export const cnicValidations = [
    {
        errorFn: (value) => {
            return value.length < 1;
        },
        message: 'You can not leave CNIC empty'
    },
    {
        errorFn: (value) => {
            const check = /^\d+$/.test(value);
            return !check;
        },
        message: 'CNIC must contain digits only'
    },
    {
        errorFn: (value) => {
            const intValue = parseInt(value);
            return intValue.toString().length !== 13;
        },
        message: 'CNIC must be 13 digits'
    },
];

export const emailValidations = [
    {
        errorFn: (value) => {
            return value.length < 1;
        },
        message: 'You can not leave Email empty'
    },
    {
        errorFn: (value) => {
            const check = /^[\w-]+(\.[\w-]+)*@[A-Za-z0-9]+(\.[A-Za-z]{2,})$/.test(value);
            return !check;
        },
        message: 'Please enter valid email address'
    },
];

export const passwordValidations = [
    {
        errorFn: (value) => {
            return value.length < 1;
        },
        message: 'You can not leave password empty'
    },
    {
        errorFn: (value) => {
            return value.length < 6;
        },
        message: 'Password must be minimum 6 characters'
    },
];