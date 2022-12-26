import { useState, useCallback, useEffect, useContext, createContext, useRef } from "react"

type MiniSWROptions = {
  revalidateOnFocus?: boolean;
  revalidateOnReconnect?: boolean;
  refreshInterval?: number;
};

type CacheEntry<T> = {
  data: T | undefined;
  isValidating: boolean;
  mutate: (nextData: any) => void;
  revalidate: () => Promise<void>;
  error?: any;
  effects: any
};

type SWRResult<T> = {
  data: T | undefined;
  isValidating: boolean;
  mutate: (nextData: any) => void;
  revalidate: () => Promise<void>;
  error?: any;
}

let CacheContext = createContext(new Map<string | null, CacheEntry<any>>());

export function useSWR<T>(
  key: string | null,
  fetcher?: (key: string) => Promise<T>,
  options?: MiniSWROptions
) {
  let cache = useContext(CacheContext);
  let [value, setValue] = useState(getNextValue);
  let revalidateInterval = useRef<any>(null);


  function getNextValue() {
    let cacheEntry = getCacheEntry();
    let nextValue = {
      data: cacheEntry.data,
      isValidating: cacheEntry.isValidating,
      mutate,
      revalidate,
    }
  }

  function getCacheEntry(): CacheEntry<T> {
    if (!cache.has(key)) {
      cache.set(key, { effects: [] } as unknown as CacheEntry<T>);
    }

    return cache.get(key) as CacheEntry<T>;
  }

}



export default useSWR
