import { testJsTcpOperate } from "./src"

const JSLibuv = () => {
  const onClick = () => {
    testJsTcpOperate()
  }

  return (
    <div>
      <button onClick={onClick}>testJsTcpOperate</button>
    </div>
  )
}

export default JSLibuv
