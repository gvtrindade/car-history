export function getStringfiedDate(date?: Date) {
  const yourDate = date ?? new Date();
  return yourDate.toISOString().split("T")[0];
}

export function includeZero(num: number) {
  return num > 10 ? num : "0" + num;
}

export const passwordValidationRegex = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-\\(\\)]).{8,}$/
);
