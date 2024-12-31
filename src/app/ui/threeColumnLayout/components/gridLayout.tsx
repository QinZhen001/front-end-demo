export const GridLayout = () => {
  return (
    <div>
      <div>grid 解决方案</div>
      <div className="grid h-[200px] grid-cols-[200px_auto_200px]">
        <div className="bg-blue-500 text-center">left</div>
        <div className="bg-red-500 text-center">main</div>
        <div className="bg-green-500 text-center">right</div>
      </div>
    </div>
  )
}
