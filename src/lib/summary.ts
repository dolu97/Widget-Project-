import * as XLSX from 'xlsx';

export function exportWorkbook(rows: Record<string, unknown>[]) {
  const workbook = XLSX.utils.book_new();
  const sheet = XLSX.utils.json_to_sheet(rows);
  XLSX.utils.book_append_sheet(workbook, sheet, 'Daily Tracker');
  XLSX.writeFile(workbook, 'daily-goals-export.xlsx');
}
