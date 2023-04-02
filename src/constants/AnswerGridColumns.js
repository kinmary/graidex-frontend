import { BtnCellRenderer } from "./BtnCellRenderer";

export const AnswerGridCol = [
    //Status is needed here?
  {
    field: "status",
    flex: 1,
    headerName: "Status",
  },
  { field: "studentId", flex: 2, headerName: "Student Id" },
  { field: "studentName", flex: 2, headerName: "Student Name" },
  { field: "date", flex: 2, headerName: "Date" },
  { field: "duration", flex: 1, headerName: "Duration" },
  { field: "mark", flex: 1, headerName: "Mark" },
  { field: "", flex: 0.1, headerName: "", cellRenderer: BtnCellRenderer},
];
