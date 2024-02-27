const validationReducer = (state, item) => {
    // console.log(item);
    //add or remove
    if (item.valid) {
        let newitem = {};
        newitem[item.name] = item.valid;
        return { ...state, ...newitem };
    } else {
        delete state[item.name];
        return { ...state };
    }
};

export default validationReducer;
