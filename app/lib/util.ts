export function getStringfiedDate(date?: Date) {
  let yourDate = date ?? new Date();
  return yourDate.toISOString().split("T")[0];
}


export function includeZero(num: number) {
  return num > 10 ? num : "0" + num;
}