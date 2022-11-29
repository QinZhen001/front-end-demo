export interface Observer {
  next: (v: any) => void;
  error: (e: any) => void;
  complete: () => void;
}

type ObserverFn = (o: Observer) => void;

function pipeFromArray(fns: Function[]) {
  if (fns.length == 0) {
    return (x: any) => x;
  }
  if (fns.length === 1) {
    return fns[0];
  }

  return (input: any) => {
    return fns.reduce((pre, cur) => cur(pre), input);
  };
}

export function map(project: Function) {
  return (observable: Observable) =>
    new Observable((subscriber) => {
      const subcription = observable.subscribe({
        next(value) {
          return subscriber.next(project(value));
        },
        error(err) {
          subscriber.error(err);
        },
        complete() {
          subscriber.complete();
        },
      });

      return subcription;
    });
}

export class Observable {
  _subscribe: ObserverFn;

  constructor(_subscribe: ObserverFn) {
    this._subscribe = _subscribe;
  }

  subscribe(observer: Observer): Subscriber {
    const subscriber = new Subscriber(observer);
    subscriber.add(this._subscribe(subscriber));
    return subscriber;
  }

  pipe(...operations: Function[]) {
    return pipeFromArray(operations)(this) as Observable;
  }
}

class Subscription {
  private _teardowns: any[];

  constructor() {
    this._teardowns = [];
  }

  unsubscribe() {
    this._teardowns.forEach((teardown) => {
      typeof teardown == "function" ? teardown() : teardown.unsubscribe();
    });
  }

  add(teardown: any) {
    if (teardown) {
      this._teardowns.push(teardown);
    }
  }
}

export class Subscriber extends Subscription {
  observer: Observer;
  isStopped: boolean;

  constructor(observer: Observer) {
    super();
    this.observer = observer;
    this.isStopped = false;
  }

  next(value: any) {
    if (this.observer.next && !this.isStopped) {
      this.observer.next(value);
    }
  }

  error(value: any) {
    this.isStopped = true;
    if (this.observer.error) {
      this.observer.error(value);
    }
  }

  complete() {
    this.isStopped = true;
    if (this.observer.complete) {
      this.observer.complete();
    }
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}
