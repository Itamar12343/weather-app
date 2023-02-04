function reducer(state = "", action) {
    switch (action.type) {
        case "change":
            return action.payload;
    }
}
export default reducer