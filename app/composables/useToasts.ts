import type { Toast } from "~/interfaces";

export const useToast = () => {
  const toasts = useState<Toast[]>("toasts", () => []);

  const add = (
    message: string,
    type: Toast["type"] = "info",
    duration: number = 3000,
  ) => {
    const id = `toast-${Date.now()}-${Math.random()}`;

    toasts.value.push({
      id,
      message,
      type,
      duration,
    });

    // Auto-remove after duration
    if (duration > 0) {
      setTimeout(() => {
        remove(id);
      }, duration);
    }

    return id;
  };

  const remove = (id: string) => {
    toasts.value = toasts.value.filter((toast) => toast.id !== id);
  };

  const clear = () => {
    toasts.value = [];
  };

  // Convenience methods
  const success = (message: string, duration?: number) =>
    add(message, "success", duration);

  const error = (message: string, duration?: number) =>
    add(message, "error", duration);

  const warning = (message: string, duration?: number) =>
    add(message, "warning", duration);

  const info = (message: string, duration?: number) =>
    add(message, "info", duration);

  return {
    toasts: readonly(toasts),
    add,
    remove,
    clear,
    success,
    error,
    warning,
    info,
  };
};
