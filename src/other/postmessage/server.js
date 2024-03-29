const http = require("http")
const fs = require("fs")
const path = require("path")

const mineTypeMap = {
  html: "text/html;charset=utf-8",
  htm: "text/html;charset=utf-8",
  xml: "text/xml;charset=utf-8",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  css: "text/css;charset=utf-8",
  txt: "text/plain;charset=utf-8",
  mp3: "audio/mpeg",
  mp4: "video/mp4",
  ico: "image/x-icon",
  ico: "image/x-icon",
  tif: "image/tiff",
  svg: "image/svg+xml",
  zip: "application/zip",
  ttf: "font/ttf",
  woff: "font/woff",
  woff2: "font/woff2",
  // 注意下面这个 (爬坑)
  // Error: The script does not have a MIME type.  (js缺少MIME type)
  js: "application/javascript",
}

const server = http.createServer((req, res) => {
  const fileName = path.resolve(__dirname, "." + req.url)
  const extName = path.extname(fileName).substr(1)

  console.log("fileName", fileName)
  console.log("extName", extName)

  if (fs.existsSync(fileName)) {
    if (mineTypeMap[extName]) {
      res.setHeader("Content-Type", mineTypeMap[extName])
    }
    const stream = fs.createReadStream(fileName)
    stream.pipe(res)
  } else {
    console.error(`${fileName} is non-existent!`)
  }
})

server.listen(9000)
