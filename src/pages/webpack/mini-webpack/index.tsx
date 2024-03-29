const MiniWebpack = () => {
  const href = new URL("./code/bundler.js", import.meta.url).href

  return (
    <div>
      <div>MiniWebpack</div>
      <div>
        <a href={href}>MiniWebpack bundler.js</a>
      </div>
    </div>
  )
}

export default MiniWebpack
