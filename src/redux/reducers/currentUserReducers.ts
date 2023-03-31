const INITIAL_STATE: any = {
    user: {}
}


const changeUser = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case "currenctUser":
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

export default changeUser;