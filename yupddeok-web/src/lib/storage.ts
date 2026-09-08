export function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;

  try {
    const rawValue = localStorage.getItem(key);
    return rawValue ? (JSON.parse(rawValue) as T) : fallback;
  } catch {
    if (typeof fallback === "string") {
      return (localStorage.getItem(key) ?? fallback) as T;
    }

    return fallback;
  }
}

export function writeStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}
