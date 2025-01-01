"use client"

import { RteErrorCenter, AGRteErrorCode } from "./src/index"
import { Button } from "@/components/ui/button"

const ErrorPackPage = () => {
  const triggerError = () => {
    const err = new Error("custom error")
    RteErrorCenter.shared.handleThrowableError(AGRteErrorCode.RTE_ERR_MISSING_PARAMS, err)
  }

  return (
    <div>
      <Button onClick={triggerError}>触发错误</Button>
    </div>
  )
}

export default ErrorPackPage
