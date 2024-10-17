function quantityReducer(state: { count: number }, action: { type: "dec" } | { type: "inc" }): { count: number } {
    switch (action.type) {
        case "dec":
            return state.count === 1 ? {count: state.count} : {count: state.count - 1};
        case "inc":
            return {count: state.count + 1};
        default:
            throw new Error();
    }
}

export default quantityReducer;