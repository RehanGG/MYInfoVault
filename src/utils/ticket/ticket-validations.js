export const ticketSubjectValidations = [
    {
        errorFn: (value) => {
            return value.length < 1;
        },
        message: 'Input is required'
    },
    {
        errorFn: (value) => {
            return value.length > 200;
        },
        message: 'Do not enter more than 200 characters'
    },
];

export const ticketDetailValidations = [
    {
        errorFn: (value) => {
            return value.length < 1;
        },
        message: 'Input is required'
    }
];