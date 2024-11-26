import { lazy } from "react"
import { CommonPageRouter } from "../main"

const AsyncAwaitRetry = lazy(() => import("../async-await-retry/page"))
const RxJS = lazy(() => import("../rx-js/page"))
const WebsocketChat = lazy(() => import("../WebsocketChat/page"))
const CodeMirror = lazy(() => import("../codemirror/page"))
const SandBox = lazy(() => import("../sandbox/page"))
const AbortController = lazy(() => import("../abort-controller/page"))
const JSBridgeComponent = lazy(() => import("../js-bridge/page"))
const ShareWorker = lazy(() => import("../share-worker/page"))
const LongTask = lazy(() => import("../long-task/page"))
const InfinityDebugger = lazy(() => import("../infinity-debugger/page"))
const Immer = lazy(() => import("../immer/page"))



export const OtherPage = () => {
  return <CommonPageRouter routes={children}></CommonPageRouter>
}

export default OtherPage
