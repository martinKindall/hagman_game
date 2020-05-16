
function randomElementFromArray<T>(elements: T[]): T {
  return elements[Math.floor(Math.random() * elements.length)];
}

export default {
  randomElementFromArray: randomElementFromArray
}
