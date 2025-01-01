import { DoubleWing } from "./components/doubleWing"
import { HolyGrail } from "./components/holyGrail"
import { FlexLayout } from "./components/flexLayout"
import { GridLayout } from "./components/gridLayout"

const threeColumnLayoutPage = () => {
  return (
    <div>
      <DoubleWing></DoubleWing>
      <div className="my-4 border-b border-slate-300"></div>
      <HolyGrail></HolyGrail>
      <div className="my-4 border-b border-slate-300"></div>
      <FlexLayout></FlexLayout>
      <div className="my-4 border-b border-slate-300"></div>
      <GridLayout></GridLayout>
    </div>
  )
}

export default threeColumnLayoutPage
