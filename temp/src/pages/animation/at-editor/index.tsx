// https://github.com/mouday/more-editor
// 需要显示@某人。
// 点击时需要整体选中，删除时需要整体删除
// 执行文字操作命令可以通过  document.execCommand(command, false, value);
import { useState, useRef, useEffect } from "react"
import "./index.css"

const AtEditor = () => {
  const contentRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    contentRef.current?.focus()

    // 无法使用 onblur 改变disabled 状态，因为点击按钮时，会先触发 onblur，然后才会触发 onclick
    //
    // contentRef.current!.onblur = (e) => {
    // }
    // contentRef.current!.onfocus = () => {
    // }
  }, [])

  useEffect(() => {
    const handle = (event: Event) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setDisabled(true)
      } else {
        setDisabled(false)
      }
    }
    window.addEventListener("click", handle)
    return () => window.removeEventListener("click", handle)
  }, [])

  const append = (text: string) => {
    let fragment = document.createDocumentFragment()
    const node = document.createElement("span")
    node.classList.add("tag")
    node.innerText = text
    node.setAttribute("contenteditable", "false")
    fragment.appendChild(node)

    // 增加不可见字符，为了放光标方便
    const bSpaceNode = document.createTextNode("\u200B")
    fragment.appendChild(bSpaceNode)

    insertHTMLNode(fragment)
  }

  // selection 有可能不存在 (鼠标焦点在editor外)
  const insertHTMLNode = (node: DocumentFragment | HTMLElement) => {
    var selection: Selection | null = window.getSelection()
    var range = selection?.getRangeAt(0)
    range?.deleteContents()
    range?.insertNode(node)
    //  移动光标到下一个输入点
    selection?.collapseToEnd()
  }

  const clickInsert = (item: any) => {
    const { value } = item
    append(value)
  }

  return (
    <div ref={wrapperRef}>
      <div
        ref={contentRef}
        id="container"
        className="container"
        contentEditable
        placeholder="请在这输入内容"
      ></div>
      <div>
        <button
          disabled={disabled}
          onClick={() => clickInsert({ name: "指标1", value: "@indicator1" })}
        >
          指标1
        </button>
        <button
          disabled={disabled}
          onClick={() => clickInsert({ name: "指标2", value: "@indicator2" })}
        >
          指标2
        </button>
        <button
          disabled={disabled}
          onClick={() => clickInsert({ name: "指标3", value: "@indicator3" })}
        >
          指标3
        </button>
        <button disabled={disabled} onClick={() => clickInsert({ name: "+", value: "+" })}>
          +
        </button>
        <button disabled={disabled} onClick={() => clickInsert({ name: "-", value: "-" })}>
          -
        </button>
        <button disabled={disabled} onClick={() => clickInsert({ name: "*", value: "*" })}>
          *
        </button>
        <button disabled={disabled} onClick={() => clickInsert({ name: "/", value: "/" })}>
          /
        </button>
        <button disabled={disabled} onClick={() => clickInsert({ name: "(", value: "(" })}>
          (
        </button>
        <button disabled={disabled} onClick={() => clickInsert({ name: ")", value: ")" })}>
          )
        </button>
      </div>
    </div>
  )
}

export default AtEditor
