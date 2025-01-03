"use client"

import { useState } from "react"
import SectionSelect, { SectionSelectValue } from "./components/SectionSelect"
import Section1 from "./components/Section1"
import Section2 from "./components/Section2"
import Section3 from "./components/Section3"

const GsapPage = () => {
  const [value, setValue] = useState<SectionSelectValue>(SectionSelectValue.section1)

  return (
    <div>
      <SectionSelect value={value} onChange={setValue}></SectionSelect>
      {value === SectionSelectValue.section1 && <Section1></Section1>}
      {value === SectionSelectValue.section2 && <Section2></Section2>}
      {value === SectionSelectValue.section3 && <Section3></Section3>}
    </div>
  )
}

export default GsapPage
