export const FlexLayout = () => {
  return (
    <div>
      <div>flex 解决方案</div>
      <div className="flex h-[200px]">
        <div className="w-[200px] flex-none bg-blue-500 text-center">left</div>
        <div className="flex-auto bg-red-500 text-center">main</div>
        <div className="w-[200px] flex-none bg-green-500 text-center">right</div>
      </div>
    </div>
  )
}
