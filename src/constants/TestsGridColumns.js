import { BtnCellRenderer } from "./BtnCellRenderer";

export const TestsGridCol = [
  {
    field: "status",
    flex: 1,
    headerName: "Status",
  },
  { field: "examName", flex: 3, headerName: "Examination name" },
  { field: "lastTimeEdit", flex: 1, headerName: "Last time edited" },
  { field: "date", flex: 1, headerName: "Date" },
  { field: "avgScore", flex: 1, headerName: "Average Score" },
  { field: "Answered", flex: 1, headerName: "Answered" },
  { field: "", flex: 0.1, headerName: "", cellRenderer: BtnCellRenderer},
];
