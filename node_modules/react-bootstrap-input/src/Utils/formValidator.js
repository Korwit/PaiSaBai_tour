const formValidator = form => {
    const notValid = [];
    Object.keys(form).forEach(key => {
        if (
            form[key] &&
            form[key].hasOwnProperty('valid') &&
            !form[key].valid
        ) {
            // console.log(form[key])
            notValid.push(form[key].label || key);
        }
    });
    const s = notValid.join(', ');

    return [notValid.length === 0, s];
};

export default formValidator;
