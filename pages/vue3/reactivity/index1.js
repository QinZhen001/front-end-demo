let activeEffect;

class Dep {
  subscribers = new Set();

  depend() {
    if (activeEffect) {
      this.subscribers.add(activeEffect);
    }
  }

  notify() {
    console.log(123123);
    this.subscribers.forEach((effect) => effect);
  }
}

function watchEffect(effect) {
  activeEffect = effect;
  effect();
}
