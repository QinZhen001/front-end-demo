import { CommonPageRouter } from "../default"
import { Suspense, lazy } from "react"


const Scheduler = lazy(() => import('./scheduler'));
const UseTransition = lazy(() => import('./useTransition'));
const TestSuspense = lazy(() => import('./suspense'));

export const children = [
  {
    path: "scheduler",
    element: <Scheduler></Scheduler>,
    title: "react 调度",
  },
  {
    path: "useTransition",
    element: <UseTransition></UseTransition>,
    title: "useTransition",
  },
  {
    path: "suspense",
    element: <TestSuspense></TestSuspense>,
    title: "suspense",
  }
]

const ReactPage = () => {
  return <CommonPageRouter routes={children}></CommonPageRouter>
};

export default ReactPage


