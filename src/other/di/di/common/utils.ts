class Logger {
  log(...args: any[]) {
    console.log(`[test] `, ...args)
  }
}

export const logger = new Logger()
