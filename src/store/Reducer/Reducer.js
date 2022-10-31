const initialState = {
    resultFirst: 0,
    resultSecond: 0
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_RESULT_FIRST': return {
            ...state,
            resultFirst: action.payload
        }
        case 'ADD_RESULT_SECOND': return {
            ...state,
            resultSecond: action.payload
        }
        default: return state;
    }
}