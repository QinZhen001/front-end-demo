import { Reaction } from "../reaction"

export interface IDebugInfo {
  /**
   * The only id of Action.
   */
  id?: number
  /**
   * The name of Action.
   */
  name?: string | null
  /**
   * Changes
   */
  changeList?: IDebugChange[]
  /**
   * Action or closure
   */
  type: string
}

export interface IDebugChange {
  /**
   * The type of change
   */
  type: string
  /**
   * Nest action call, only type is action.
   */
  action?: IDebugInfo
  callStack?: PropertyKey[]
  oldValue?: any
  value?: any
  /**
   * The key of the operation
   */
  key?: PropertyKey
}

export type EventType = number | string

export type ICallback = (context?: any) => void

export interface IEvent {
  callback: ICallback
}

export type IBinder = Map<PropertyKey, IKeyBinder>
export type IKeyBinder = Set<Reaction>
export type IFunc = (...args: any[]) => any
