import { Ref, useRef, MutableRefObject, useEffect } from "react"

import CodeMirror from "codemirror"
import "codemirror/mode/javascript/javascript"
import "codemirror/mode/css/css"
import "codemirror/mode/markdown/markdown"
import "codemirror/mode/xml/xml"
import "codemirror/mode/pug/pug"
import "codemirror/mode/sass/sass"
import "codemirror/mode/vue/vue"
import "codemirror/mode/handlebars/handlebars"
import "codemirror/mode/htmlmixed/htmlmixed"
import "codemirror/addon/display/placeholder"
import "codemirror/lib/codemirror.css"

export function useCodeMirror(
  textarea: MutableRefObject<HTMLTextAreaElement | null>,
  input: MutableRefObject<string | null>,
  options: CodeMirror.EditorConfiguration = {},
) {
  const cm = CodeMirror.fromTextArea(textarea.current!, {
    theme: "vars",
    ...options,
  })

  let skip = false

  cm.on("change", () => {
    if (skip) {
      skip = false
      return
    }
    input.current = cm.getValue()
  })

  useEffect(() => {
    if (input.current !== cm.getValue()) {
      const selections = cm.listSelections()
      cm.replaceRange(input.current!, cm.posFromIndex(0), cm.posFromIndex(Infinity))
      cm.setSelections(selections)
    }
  }, [input.current])

  return cm
}
