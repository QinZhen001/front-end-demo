import { CommonPageRouter } from "../main"
import { Suspense, lazy } from "react"
import { PageRoute } from "../../types"

const SimpleRedux = lazy(() => import('./redux'));
const Scheduler = lazy(() => import('./scheduler'));
const UseTransition = lazy(() => import('./useTransition'));
const UseDeferredValue = lazy(() => import('./useDeferredValue'));
const TestSuspense = lazy(() => import('./suspense'));
const TestSwr = lazy(() => import('./swr'));
const AHooks = lazy(() => import('./ahooks'));
const Dob = lazy(() => import('./dob'));
const UseCountdown = lazy(() => import('./useCountdown'));


export let children: PageRoute[] = [
  {
    path: "redux",
    element: <SimpleRedux></SimpleRedux>,
    title: "redux 简单实现",
  },
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
    path: "useDeferredValue",
    element: <UseDeferredValue></UseDeferredValue>,
    title: "useDeferredValue",
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
  },
  {
    path: "ahooks",
    element: <AHooks></AHooks>,
    title: "ahooks 仿写",
  },
  {
    path: "dob",
    element: <Dob></Dob>,
    title: "dob 仿写",
  },
  {
    path: "useCountdown",
    element: <UseCountdown></UseCountdown>,
    title: "useCountdown（倒计时）",
  }
]

// TIP: first element is default page,show as default router in outlet 
children.unshift({
  index: true,
  element: children[0].element,
  title: "default",
})

const ReactPage = () => {
  return <CommonPageRouter routes={children}></CommonPageRouter>
};

export default ReactPage


