export function getRandomFromList(lst: Array<any>): any {
  return lst[Math.floor(Math.random() * lst.length)];
}