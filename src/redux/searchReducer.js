function searchReducer(state = "", action) {
    switch (action.type) {
        case "change":
            return action.text;
        default:
            return state;
    }
}
export default searchReducer;