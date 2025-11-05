export function useDebounce(fn: Function, delay = 300) {
  let timeout: number;

  const debouncedFn = (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };

  const cancel = () => {
    clearTimeout(timeout);
  };

  const flush = (...args: any[]) => {
    clearTimeout(timeout);
    fn(...args);
  };

  onUnmounted(() => {
    clearTimeout(timeout);
  });

  debouncedFn.cancel = cancel;
  debouncedFn.flush = flush;

  return debouncedFn;
}
