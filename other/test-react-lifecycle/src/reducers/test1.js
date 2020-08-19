const test1 = (state = [], action) => {
    switch (action.type) {
        case "1":
            return [1, 2, 3]
        case "2":
            return [2, 1, 3]
        default:
            return [1, 1, 1, 1, 1, 1, 1, 1, 1]
    }
}

export default test1