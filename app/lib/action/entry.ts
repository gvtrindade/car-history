import {
  deleteEntry,
  fetchEntriesByCarAndUserByYear,
  fetchEntryRecordYearByCarId,
  insertEntry,
  updateEntry,
} from "@/app/lib/data/entry";
import { Entry } from "../definitions";

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

export async function postEntry(entry: any, carId: string) {
  await insertEntry(entry, carId);
}

export async function putEntry(userId: string, entry: Entry) {
  // Get user credentials
  await updateEntry(entry, userId);
}

export async function deleteEntryById(userId: string, entry: Entry) {
  await deleteEntry(entry, userId);
}
