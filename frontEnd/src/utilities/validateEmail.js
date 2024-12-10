const validateEmail = (email) => {
    
    // in regex , the period(.) is a special character so u need to use escaped period/dot(.) for defining a regex
    const emailRegex=/^[a-zA-Z0-9._]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/;

    return emailRegex.test(email);
};


export default validateEmail
