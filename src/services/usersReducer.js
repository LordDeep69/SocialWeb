export const initialUser = {isAutenticated: false,
user: null
};

export const userReducer = (state = initialUser, action) => {
    switch (action.type) {
        case "login":
            return {...action.payload};
        case "logout":
            return initialUser;
        case "update":
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload
                }
            };
            
        default:
            return state;
    }
}
