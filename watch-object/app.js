// 1. Watching an Object
function watch(
  obj,
  getCallback,
  setCallback
) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      if (typeof key === "string" && key in target && getCallback) {
        getCallback(key, target[key]);
      }
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      if (typeof key === "string" && setCallback) {
        setCallback(key, value);
      }
      return Reflect.set(target, key, value, receiver);
    }
  });
}

// Example usage:
const obj = {};
const watchedObj = watch(
  obj,
  (key, value) => console.log("property accessed:", key),
  (key, value) => console.log("property modified:", key, value)
);

watchedObj.foo; // No watch called, property doesn't exist
watchedObj.foo = true; // Logs: property modified: foo true
watchedObj.foo; // Logs: property accessed: foo
