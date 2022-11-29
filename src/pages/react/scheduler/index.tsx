// https://mp.weixin.qq.com/s/uuxHlanqyN2HneYOz7DMVw
// https://github.com/facebook/react/tree/main/packages/scheduler
// React核心调度功能
import { useEffect } from "react";
import { init, destory } from "./src";

export const Scheduler = () => {
  useEffect(() => {
    init();
    return () => {
      destory();
    };
  }, []);

  return (
    <div id="react-scheduler">
      <div>React核心调度功能</div>
    </div>
  );
};


export default Scheduler
