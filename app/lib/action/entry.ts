import {
  deleteEntry,
  fetchCarLastMileage,
  fetchEntriesByCarAndUserByYear,
  fetchEntryRecordYearByCarId,
  insertEntry,
  updateEntry,
} from "@/app/lib/data/entry";
import { Entry } from "@/app/lib/definitions";

export async function getEntriesByCarAndYear(
  userId: string,
  carId: string,
  year: number = new Date().getFullYear()
) {
  const entries = await fetchEntriesByCarAndUserByYear(carId, userId, year);
  return entries;
}

export async function getEntryRecordYearByCarId(userId: string, carId: string) {
  const years = await fetchEntryRecordYearByCarId(carId, userId);
  return years;
}

export async function postEntry(
  entry: { [key: string]: string | number },
  carId: string
) {
  await insertEntry(entry, carId);
}

export async function putEntry(userId: string, entry: Entry) {
  // Get user credentials
  await updateEntry(entry, userId);
}

export async function deleteEntryById(userId: string, entry: Entry) {
  await deleteEntry(entry, userId);
}

export async function getCarLastMileage(userId: string, carId: string) {
  return await fetchCarLastMileage(carId, userId);
}
