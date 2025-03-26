export function getStringfiedDate(date?: Date) {
  const yourDate = date ?? new Date();
  return yourDate.toISOString().split("T")[0];
}

export function includeZero(num: number) {
  return num > 10 ? num : "0" + num;
}

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

export const passwordValidationRegex = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-\\(\\)]).{8,}$/
);
