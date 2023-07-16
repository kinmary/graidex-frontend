import  BtnCellRenderer  from "./BtnCellRenderer";

export const StudentListGridColumns = [
  { field: "name", flex: 1, headerName: "Name" },
  { field: "surname", flex: 2, headerName: "Surname" },
  { field: "customId", flex: 1, headerName: "Student Id" },
  { field: "email", flex: 2, headerName: "Email" },
  { field: "", flex: 0.2, headerName: "", cellRenderer: BtnCellRenderer,  },
];
