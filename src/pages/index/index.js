import "./index.html"
import "../../common/less/common.less"


// url拼接上.html
const contents = [
  {
    title: "cross-domain 跨域通信",
    url: "cross-domain"
  }
]


const body = document.body
// console.log("body", body)

const ul = document.createElement("ul")
contents.sort((a, b) => {
  const titleA = a.title
  const titleB = b.title
  return titleA.charCodeAt(0) - titleB.charCodeAt(0)
})
contents.forEach(item => {
  const title = item.title
  const url = title.split(" ")[0] + ".html"
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.innerText = title
  a.setAttribute("href", url)
  li.appendChild(a)
  ul.appendChild(li)
})

body.appendChild(ul)
