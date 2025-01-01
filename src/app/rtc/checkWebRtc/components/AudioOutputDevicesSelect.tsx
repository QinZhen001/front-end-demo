import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

interface AudioOutputDevicesSelectProps {
  options: MediaDeviceInfo[]
}

export const AudioOutputDevicesSelect = (props: AudioOutputDevicesSelectProps) => {
  const { options } = props

  return (
    <Select>
      <SelectTrigger className="w-72">
        <SelectValue placeholder="选择音频输出设备" />
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
