const fs = require("fs")
const path = require("path")

module.exports = (dirPath = "./public") => {
    return async (ctx, next) => {
        if (ctx.url.indexOf("/public") === 0) {
            // public开头 读取文件
            const url = path.resolve(__dirname, dirPath)
            const fileBaseName = path.basename(url)
            const filePath = url + ctx.url.replace("/public", "")
            try {
               const status = fs.statSync(filePath)
                if (status.isDirectory()) {
                    const dir = fs.readdirSync(filePath)
                    console.log("dir",dir)
                    const ret = ['<div style="padding-left:20px">'];
                    dir.forEach(fileName => {
                        console.log("fileName", fileName)
                        // 简单认为不带小数点的格式，就是文件夹，实际应该用statSync
                        if (fileName.indexOf(".") > -1) {
                            ret.push(
                                `<p><a style="color:black" href="${
                                ctx.url
                                }/${fileName}">${fileName}</a></p>`
                            );
                        } else {
                            // 文件
                            ret.push(
                                `<p><a href="${ctx.url}/${fileName}">${fileName}</a></p>`
                            );
                        }
                    })
                    ret.push("</div>")
                    ctx.body = ret.join("")
                } else {
                    const content = fs.readFileSync(filePath);
                    ctx.body = content;
                }
            } catch (error) {
                // 报错了 文件不存在
                ctx.body = "404, not found" + error;
            }
        } else {
            // 否则不是静态资源，直接去下一个中间件
            await next();
        }
    }
}