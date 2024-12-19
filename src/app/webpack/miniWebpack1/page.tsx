import NextLink from "next/link"
const href = new URL("./code/bundler.js", import.meta.url).href

const MiniWebpack = () => {
  return (
    <NextLink className="text-blue-500" href={href}>
      MiniWebpack bundler.js
    </NextLink>
  )
}

export default MiniWebpack
