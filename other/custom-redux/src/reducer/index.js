const ADD_GUN = "加机关枪"
const REMOVE_GUN = "减机关枪"

export function counter(state = 0, action) {
    switch (action.type) {
        case ADD_GUN:
            return state + 1
        case REMOVE_GUN:
            return state - 1
        default:
            return 10
    }
}

export function addGun() {
    return {type: ADD_GUN}
}

export function removeGun() {
    return {type: REMOVE_GUN}
}

export function addTwice() {
    return [{type: ADD_GUN}, addGunAsync()]
}

// 延迟添加，拖两天再给
export function addGunAsync() {
    //thunk插件的作用，这里可以返回函数
    return dispatch => {
        setTimeout(() => {
            //异步结束后，手动执行dispatch
            dispatch(addGun())
        }, 2000)
    }
}