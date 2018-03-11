const test2 = (state = [], action) => {
    switch (action.type) {
        case "1":
            return [1, 2, 3, 4]
        case "2":
            return [2, 1, 3, 4]
        default:
            return [2, 2, 2, 2, 2, 2, 2, 2]
    }
}

export default test2