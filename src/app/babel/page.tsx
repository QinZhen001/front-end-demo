import NextLink from "next/link"

const babel7DemoHref = "https://github.com/QinZhen001/babel7-demo"
const babelPluginImportHref = "https://github.com/QinZhen001/babel-plugin-import"

const BabePage = () => {
  return (
    <>
      <div>
        <NextLink className="text-blue-500" href={babel7DemoHref} target="_blank">
          babel7-demo
        </NextLink>
      </div>
      <div>
        <NextLink className="text-blue-500" href={babelPluginImportHref} target="_blank">
          babel-plugin-import
        </NextLink>
      </div>
    </>
  )
}

export default BabePage
