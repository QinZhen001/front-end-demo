export const DoubleWing = () => {
  return (
    <div>
      <div>双飞翼布局</div>
      <div className="overflow-hidden">
        <div className="float-left h-[200px] w-full bg-rose-500 text-center">
          <div className="ml-[200px] mr-[200px] text-center">main</div>
        </div>
        <div className="float-left -ml-[100%] h-[200px] w-[200px] bg-blue-500 text-center">
          left
        </div>
        <div className="float-right -ml-[200px] h-[200px] w-[200px] bg-green-500 text-center">
          right
        </div>
      </div>
      <footer className="bg-cyan-500 text-center">footer</footer>
    </div>
  )
}
