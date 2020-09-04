
const validEmailRegex = RegExp(
    `^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+.)?[a-zA-Z]+.)?(igdtuw.ac.in)$`
);

const formValidator = ({email, password, confirmPassword},setState) => {
    let errors = [];
    if(!validEmailRegex.test(email)){
        setState( (prevFormData) =>({
            ...prevFormData,
            errors:{
                ...prevFormData.errors,
                email:'Please enter valid official email ID!'
            }
        }));
        errors.push('Please enter valid official email ID!');
    } else {
        setState( (prevFormData) =>({
            ...prevFormData,
            errors:{
                ...prevFormData.errors,
                email:''
            }
        }));
    }

    if(password.length < 6){
        setState( (prevFormData) =>({
            ...prevFormData,
            errors:{
                ...prevFormData.errors,
                password:'Password too short (min 6 digits)!'
            }
        }));
        errors.push('Password too short');
    } else if(password !== confirmPassword) {
        setState( (prevFormData) =>({
            ...prevFormData,
            errors:{
                ...prevFormData.errors,
                password:'Passwords do not match!'
            }
        }));
        errors.push('Password do not match!');
    }

    return(errors);
}

export default formValidator;