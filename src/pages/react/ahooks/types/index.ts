export type Service<TData, TParams extends any[]> = (...args: TParams) => Promise<TData>

export interface Options<TData, TParams extends any[]> {
  manual?: boolean

  onBefore?: (params: TParams) => void
  onSuccess?: (data: TData, params: TParams) => void
  onError?: (e: Error, params: TParams) => void
  // formatResult?: (res: any) => TData;
  onFinally?: (params: TParams, data?: TData, e?: Error) => void

  defaultParams?: TParams

  // refreshDeps
  // refreshDeps?: DependencyList;
  refreshDepsAction?: () => void

  // loading delay
  loadingDelay?: number

  // polling
  pollingInterval?: number
  pollingWhenHidden?: boolean
  pollingErrorRetryCount?: number

  // refresh on window focus
  refreshOnWindowFocus?: boolean
  focusTimespan?: number

  // debounce
  debounceWait?: number
  debounceLeading?: boolean
  debounceTrailing?: boolean
  debounceMaxWait?: number

  // throttle
  throttleWait?: number
  throttleLeading?: boolean
  throttleTrailing?: boolean

  // cache
  cacheKey?: string
  cacheTime?: number
  staleTime?: number
  // setCache?: (data: CachedData<TData, TParams>) => void;
  // getCache?: (params: TParams) => CachedData<TData, TParams> | undefined;

  // retry
  retryCount?: number
  retryInterval?: number

  // ready
  ready?: boolean

  // [key: string]: any;
}

export interface FetchState<TData, TParams extends any[]> {
  loading: boolean
  params?: TParams
  data?: TData
  error?: Error
}

export type Plugin<TData, TParams extends any[]> = any
