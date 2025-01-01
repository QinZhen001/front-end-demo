import NextLink from "next/link"
const href = new URL("./src/index.js", import.meta.url).href

const MiniWebpack = () => {
  return (
    <NextLink className="text-blue-500" href={href}>
      MiniWebpack
    </NextLink>
  )
}

export default MiniWebpack
