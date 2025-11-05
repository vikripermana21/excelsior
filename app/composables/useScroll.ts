import { ref, onMounted, onUnmounted, computed } from "vue";

export interface UseScrollOptions {
  /**
   * Target element to track scroll on
   * @default window
   */
  target?: HTMLElement | Window | null;
  /**
   * Throttle delay in milliseconds
   * @default 0
   */
  throttle?: number;
  /**
   * Callback when scroll occurs
   */
  onScroll?: (e: Event) => void;
}

export function useScroll(options: UseScrollOptions = {}) {
  const { target, throttle = 0, onScroll } = options;

  const x = ref(0);
  const y = ref(0);
  const isScrolling = ref(false);

  let throttleTimeout: ReturnType<typeof setTimeout> | null = null;
  let scrollTimeout: ReturnType<typeof setTimeout> | null = null;

  const arrivedState = computed(() => ({
    left: x.value <= 0,
    right: false,
    top: y.value <= 0,
    bottom: false,
  }));

  const directions = computed(() => {
    let prevX = x.value;
    let prevY = y.value;

    return {
      left: x.value < prevX,
      right: x.value > prevX,
      top: y.value < prevY,
      bottom: y.value > prevY,
    };
  });

  const handleScroll = (e: Event) => {
    const element = (
      e.target === document ? document.documentElement : e.target
    ) as HTMLElement;

    if (element === document.documentElement || element === document.body) {
      x.value =
        window.scrollX ||
        window.pageXOffset ||
        document.documentElement.scrollLeft;
      y.value =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop;
    } else {
      x.value = element.scrollLeft;
      y.value = element.scrollTop;
    }

    isScrolling.value = true;

    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    scrollTimeout = setTimeout(() => {
      isScrolling.value = false;
    }, 100);

    if (onScroll) {
      onScroll(e);
    }
  };

  const throttledScroll = (e: Event) => {
    if (throttle <= 0) {
      handleScroll(e);
      return;
    }

    if (!throttleTimeout) {
      handleScroll(e);
      throttleTimeout = setTimeout(() => {
        throttleTimeout = null;
      }, throttle);
    }
  };

  const scrollTo = (
    xPos: number,
    yPos: number,
    behavior: ScrollBehavior = "smooth",
  ) => {
    const element = (target || window) as Window | HTMLElement;

    if ("scrollTo" in element) {
      element.scrollTo({ left: xPos, top: yPos, behavior });
    }
  };

  const scrollToTop = (behavior: ScrollBehavior = "smooth") => {
    scrollTo(x.value, 0, behavior);
  };

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    const element = (target || document.documentElement) as HTMLElement;
    const maxY = element.scrollHeight - element.clientHeight;
    scrollTo(x.value, maxY, behavior);
  };

  onMounted(() => {
    const element = (target || window) as Window | HTMLElement;
    element.addEventListener("scroll", throttledScroll, { passive: true });

    if (element === window) {
      x.value = window.scrollX || window.pageXOffset;
      y.value = window.scrollY || window.pageYOffset;
    } else {
      x.value = (element as HTMLElement).scrollLeft;
      y.value = (element as HTMLElement).scrollTop;
    }
  });

  onUnmounted(() => {
    const element = (target || window) as Window | HTMLElement;
    element.removeEventListener("scroll", throttledScroll);

    if (throttleTimeout) {
      clearTimeout(throttleTimeout);
    }
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
  });

  return {
    x,
    y,
    isScrolling,
    arrivedState,
    directions,
    scrollTo,
    scrollToTop,
    scrollToBottom,
  };
}
