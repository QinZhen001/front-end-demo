let popstateTime = 0;

function getHistoryItem(time) {
  let index = findHistoryIndex({ time }); // 从localHistory列表中查找
  let historyIndex = index - 1; // 取当前event.state对应的历史数据的上一条数据
  return findHistoryItem(historyIndex);
}

function setPopstateTime(time) {
  let historyItem = getHistoryItem(time);
  popstateTime = (historyItem && historyItem.time) || popstateTime || 0;
}

// 监听前进、后退按钮
window.addEventListener(
  "popstate",
  function (evt) {
    trigger(evt);
  },
  false
);

function trigger(e) {
  let state = e.state;
  let time = state.time;
  if (popstateTime === 0) {
    // 第一次一定是后退按钮
    setPopstateTime(e.state.time);
    debugger;
    // redirectBack()
  } else {
    if (e.state.time >= this.popstateTime) {
      // 前进回调
      debugger;
    } else {
      setPopstateTime(e.state.time);
      debugger;
      // 后退回调
    }
  }
}
