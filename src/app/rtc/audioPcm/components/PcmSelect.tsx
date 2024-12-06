import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export enum PcmSelectValue {
  AudioWorkletNode = "AudioWorkletNode",
  MediaRecorder = "MediaRecorder",
}

interface PcmSelectProps {
  value: PcmSelectValue
  onChange: (value: PcmSelectValue) => void
  className?: string
}

const PcmSelect = (props: PcmSelectProps) => {
  const { value, onChange, className } = props

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="max-w-64 ">
        <SelectValue placeholder="选择处理方案" />
      </SelectTrigger>
      <SelectContent className="max-w-64">
        <SelectItem value="AudioWorkletNode">AudioWorkletNode</SelectItem>
        <SelectItem value="MediaRecorder">MediaRecorder</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default PcmSelect
