import { IKeyBinder，IFunc˝ } from './types'

export class Reaction {
  private name: string
  // Run reaction's delay.
  private delay: number | null = null
  // Binders for this reaction.
  // Binder include callback, and it's detail info, like delay.
  private keyBinders = new Set<IKeyBinder>()
  // Callback for this reaction.
  private callback: IFunc | null


  constructor(name: string, callback: IFunc, delay?: number) {
    this.name = name
    this.callback = callback
    this.delay = delay || null
  }


  //TODO: Current only support synchronization, do not support asynchronous!
  public track(callback?: IFunc) {
    if (!callback) {
      return
    }
    // If it is already in track, add this directly to the pendingTrack queue, and return.
    // When the lastest runObserver is executed, current pendingTrack will executed.
    if (inTrack()) {
      globalState.pendingTracks.add(this.track.bind(this, callback))
      return
    }
  }


}
