import NextLink from "next/link"

const templateHref = "https://github.com/QinZhen001/qz-template"

const TemplatePage = () => {
  return (
    <div>
      <NextLink className="text-blue-500" href={templateHref} target="_blank">
        项目模板 Template
      </NextLink>
    </div>
  )
}

export default TemplatePage
