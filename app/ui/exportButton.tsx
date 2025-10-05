"use client";

import { Button } from "@/components/ui/button";
import { Entry } from "@/app/lib/definitions";

type Props = {
  entries: Entry[];
  carName: string;
  year: number;
};

export default function ExportButton({ entries, carName, year }: Props) {
  const handleExport = () => {
    // CSV headers
    const headers = ["Date", "Description", "Odometer", "Place", "Tags", "Amount"];

    // Convert entries to CSV rows
    const rows = entries.map((entry) => {
      const date = new Date(entry.date).toLocaleDateString();
      const description = `"${entry.description.replace(/"/g, '""')}"`;
      const odometer = entry.odometer;
      const place = entry.place ? `"${entry.place.replace(/"/g, '""')}"` : "";
      const tags = `"${entry.tags.replace(/"/g, '""')}"`;
      const amount = entry.amount;

      return [date, description, odometer, place, tags, amount].join(",");
    });

    // Combine headers and rows
    const csv = [headers.join(","), ...rows].join("\n");

    // Create blob and download
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", `${carName}_${year}_entries.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button onClick={handleExport} disabled={entries.length === 0}>
      Export
    </Button>
  );
}
