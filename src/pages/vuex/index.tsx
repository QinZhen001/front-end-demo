// @ts-ignore
import store from "./store";
import { useEffect, useState } from "react";

// @ts-ignore
window.store = store;

export const VuexPage = () => {
  const [updater, setUpdater] = useState(0);

  const syncIncre = () => {
    store.mutations.incre(10);
    setUpdater(updater + 1);
  };

  const asyncIncre = () => {
    store.actions.actionTest(20);
    setTimeout(() => {
      setUpdater(updater + 1);
    }, 3000);
  };

  return (
    <div style={{ padding: "10px" }}>
      <div>store.state: {store.state.num}</div>
      <div>store.getters: {store.getters.getNum}</div>
      <div>
        <button onClick={syncIncre}>sync incre</button>
        <button onClick={asyncIncre}>async incre</button>
      </div>
    </div>
  );
};
