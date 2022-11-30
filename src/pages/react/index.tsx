import { CommonPageRouter } from "../default"
import { Suspense, lazy } from "react"


const Scheduler = lazy(() => import('./scheduler'));
const UseTransition = lazy(() => import('./useTransition'));
const TestSuspense = lazy(() => import('./suspense'));
const TestSwr = lazy(() => import('./swr'));

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
  },
  {
    path: "swr",
    element: <TestSwr></TestSwr>,
    title: "swr",
  }
]

const ReactPage = () => {
  return <CommonPageRouter routes={children}></CommonPageRouter>
};

export default ReactPage


