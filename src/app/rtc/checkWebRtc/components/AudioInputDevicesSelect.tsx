import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

interface AudioInputDevicesSelectProps {
  options: MediaDeviceInfo[]
}

export const AudioInputDevicesSelect = (props: AudioInputDevicesSelectProps) => {
  const { options } = props

  return (
    <Select>
      <SelectTrigger className="w-72">
        <SelectValue placeholder="选择音频输入设备" />
      </SelectTrigger>
      <SelectContent>
        {options.map((item) => (
          <SelectItem key={item.deviceId} value={item.deviceId}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
