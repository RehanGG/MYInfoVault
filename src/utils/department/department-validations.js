export const departmentDataValidations = [
    {
        errorFn: (value) => {
            return value.length < 1;
        },
        message: 'Input is required'
    },
];

export const departmentNameValidations = [
    {
        errorFn: (value) => {
            return value.length < 1;
        },
        message: 'Department name is required'
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
        message: 'Please enter valid department name'
    },

];
export const departmentDescriptionValidations = [
    {
        errorFn: (value) => {
            return value.length < 1;
        },
        message: 'Department description is required'
    },
    {
        errorFn: (value) => {
            return value.length < 15;
        },
        message: 'Minimum 15 characters are required'
    },
];