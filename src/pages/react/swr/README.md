# swr

useSWR 的 API 形式为 useSWR(key, fetcher, config)，它将 key 作为请求的 ID。如果多个组件需要共用一个请求，那它们就使用相同的 key 来调用 useSWR。useSWR 内部通过一个全局 Map 来实现 key 和请求的关系，多次调用 useSWR 时，相同的 key 在 useSWR 中只存在一个请求结果。
