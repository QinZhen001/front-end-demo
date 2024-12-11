import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

interface VideoInputDevicesSelectProps {
  options: MediaDeviceInfo[]
}

export const VideoInputDevicesSelect = (props: VideoInputDevicesSelectProps) => {
  const { options } = props

  return (
    <Select>
      <SelectTrigger className="w-72">
        <SelectValue placeholder="选择视频输入设备" />
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
