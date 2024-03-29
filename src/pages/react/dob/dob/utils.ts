import { globalState } from "./global-state"

export function isPrimitive(value: any): boolean {
  if (value === null || value === undefined) {
    return true
  }

  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    value instanceof Date
  ) {
    return true
  }

  return false
}

export const noop = () => {}

/**
 * Wether dob is in batch.
 */
export function inAction() {
  return globalState.batchDeep !== 0
}

/**
 * Is it currently in reaction?
 */
export function inTrack() {
  return !!globalState.currentReaction
}
