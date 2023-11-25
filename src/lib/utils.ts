export function extend(source: any, target: any, instance?: any) {
  if (source === null || typeof source === "undefined") return;
  if (typeof source !== "object") source = [source];

  const isSourceArray = Array.isArray(source);

  if (!isSourceArray) {
    const keys = Object.getOwnPropertyNames(source);

    keys.forEach((key) => {
      const value = source[key];
      const isValidFunc = instance && typeof value === "function";

      target[key] = isValidFunc ? value.bind(instance) : value;
    });
  } else {
    source.forEach((value: string | Function, index: number) => {
      const isValidFunc = instance && typeof value === "function";
      target[index] = isValidFunc ? value.bind(instance) : value;
    });
  }
}
