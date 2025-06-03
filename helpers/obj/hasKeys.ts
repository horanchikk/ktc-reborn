export function hasKeys(obj: object, keys: string[]) {
  return keys.every(key => Object.prototype.hasOwnProperty.call(obj, key))
}
