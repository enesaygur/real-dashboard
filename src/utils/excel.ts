import * as XLSX from "xlsx";

export function exportToExcel<T extends object>(filename: string, data: T[]) {
  if (!data.length) return;

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
  XLSX.writeFile(workbook, `${filename}.xlsx`);
}
