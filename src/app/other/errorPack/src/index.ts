export enum AGRteErrorCode {
  RTE_ERR_MISSING_PARAMS = "100000",
  RTE_ERR_SCENE_NOT_READY = "100001",
}

export interface AGErrorOption {
  // original error object if there's any
  original?: Error
  // relevant object
  currentTarget?: any
}

export class AGErrorBase extends Error {
  readonly code: AGRteErrorCode
  readonly option?: AGErrorOption
  constructor(code: AGRteErrorCode, option?: AGErrorOption) {
    super()
    this.code = code
    this.option = option
  }
}

export class AGRteError extends AGErrorBase {}

export abstract class AbstractErrorCenter {
  abstract handleThrowableError(code: string, error?: Error): void
  abstract handleNonThrowableError(code: string, error?: Error): void
}

export class RteErrorCenter extends AbstractErrorCenter {
  static shared = new RteErrorCenter()

  private _handleError(code: AGRteErrorCode, error?: Error) {
    // 可以接入自定义 Logger （带日志上传）
    console.error(`[RteErrorCenter] error ${code}: ${error?.message}`)
  }

  handleThrowableError(code: AGRteErrorCode, error?: Error) {
    this._handleError(code, error)
    throw error
  }

  handleNonThrowableError(code: AGRteErrorCode, error?: Error) {
    this._handleError(code, error)
  }
}
