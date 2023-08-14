export const debounce = (fn: Function, delay = 600) => {
  let timer: number;
  return function(this: any, ...args: unknown[]) {
    if (timer > 0) {
      clearTimeout(timer)
    }
    timer = window.setTimeout(() => {
      fn.apply(this, args);
      timer = -1;
    }, delay);
  }
};
