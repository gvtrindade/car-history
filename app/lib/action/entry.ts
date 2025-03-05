import {
  deleteEntry,
  fetchEntriesByCarAndUserByYear,
  fetchEntryRecordYearByCarId,
  insertEntry,
  updateEntry,
} from "@/app/lib/data/entry";

// TODO: get user id via session
const userId = "4f245a8f-07ec-4085-9870-7bbd8ee807ab";

export async function getEntriesByCarAndYear(
  carId: string,
  year: number = new Date().getFullYear()
) {
  const entries = await fetchEntriesByCarAndUserByYear(carId, userId, year);
  return entries;
}

export async function getEntryRecordYearByCarId(carId: string) {
  const years = await fetchEntryRecordYearByCarId(carId, userId);
  return years;
}

export async function postEntry(entry: any, carId: string) {
  await insertEntry(entry, carId);
}

export async function putEntry(entry: any, carId: string) {
  await updateEntry(entry, carId);
}

export async function deleteEntryById(entryId: number, carId: string) {
  await deleteEntry(entryId, carId);
}
