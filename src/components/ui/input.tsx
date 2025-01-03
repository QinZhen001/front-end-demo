import * as Label from "@radix-ui/react-label"

interface InputProps {
  defaultValue?: string
  value?: string
  type?: string
  label?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = (props: InputProps) => {
  const { defaultValue, value, onChange, type = "text", label } = props

  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      {label ? <Label.Root className="text-lg">{label}</Label.Root> : null}
      <input
        className="bg-blackA2 shadow-blackA6 focus:shadow-outline inline-flex h-8 w-52 appearance-none items-center justify-center rounded px-2.5 text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_black] focus:outline-none"
        type={type}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
      />
    </span>
  )
}

export { Input }
