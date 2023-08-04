export const initialState = 1;

export const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case "increment":
            return state + 1;
        case "decrement":
            if (state === 0) {
                return state
            }else {
                return state - 1;
            }
            
        default:
            return state;
    }
}

const initialState = [];

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "add":
            return state.push(action.payload)
        case "delete":
            return state.filter(element => element.id !== action.payload)
        case "update":
            return state.map(element => element.id === action.payload.id ? action.payload : element)
        case "fill":
            return action.payload;
        default:
            return state;
    }
}