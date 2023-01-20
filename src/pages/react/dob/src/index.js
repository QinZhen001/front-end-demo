export const observable = (obj) => {
  // 判断是否是基本类型
  // if (isPrimitive(obj)) {
  //   throw TypeError(`dob not support ${obj}, because it is a basic type.`)
  // }

  if (globalState.proxies.has(obj)) {
    return globalState.proxies.get(obj)
  }

  // Proxy inert packaging.
  return toObservable(obj)
}

export const observe = () => {

}
