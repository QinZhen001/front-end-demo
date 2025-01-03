import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export enum SectionSelectValue {
  section1 = "section1",
  section2 = "section2",
  section3 = "section3",
}

interface SectionSelectProps {
  value: SectionSelectValue
  onChange: (value: SectionSelectValue) => void
  className?: string
}

const SectionSelect = (props: SectionSelectProps) => {
  const { value, onChange, className } = props

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="max-w-64">
        <SelectValue placeholder="选择处理方案" />
      </SelectTrigger>
      <SelectContent className="max-w-64">
        <SelectItem value="section1">section1</SelectItem>
        <SelectItem value="section2">section2</SelectItem>
        <SelectItem value="section3">section3</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default SectionSelect
