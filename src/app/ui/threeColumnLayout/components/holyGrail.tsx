export const HolyGrail = () => {
  return (
    <div>
      <div>圣杯布局</div>
      <div className="overflow-hidden px-[200px]">
        <div className="float-left h-[200px] w-full bg-green-500 text-center">main</div>
        <div className="relative -left-[200px] float-left -ml-[100%] h-[200px] w-[200px] bg-red-500 text-center">
          left
        </div>
        <div className="relative left-[200px] float-left -ml-[200px] h-[200px] w-[200px] bg-blue-500 text-center">
          right
        </div>
      </div>
      <footer className="bg-teal-500 text-center">footer</footer>
    </div>
  )
}
