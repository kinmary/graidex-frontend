import {Button} from "react-bootstrap";

export const AnswerGridCol = [
  {
    sortable: true,
    field: "student",
    flex: 1,
    autoHeight: true,
    headerName: "Student",
    valueGetter: (params: any) => {
      return params.data.student.name + " " + params.data.student.surname + "\n" + params.data.student.customId;
    },
    getQuickFilterText: (params: any) => {
      return params.data.student.name + " " + params.data.student.surname + "\n" + params.data.student.customId;
    },
    cellRenderer: (params: any) => (
      <div className="d-flex my-1">
        <div className="d-flex flex-column">{/* <Image className="profile-image my-1 ms-0 me-2" src={params.value.profileImage || profilePic} /> */}</div>
        <div className="d-flex flex-column lh-base">
          <div style={{fontWeight: "bold"}}>
            {params.data.student.name} {params.data.student.surname}
          </div>
          <div>{params.data.student.customId}</div>
        </div>
      </div>
    ),
  },
  {
    field: "startEnd",
    sortable: true,
    flex: 1,
    autoHeight: true,
    headerName: "Timeline",
    valueGetter: (params: any) => {
      return new Date(params.data.startTime).toLocaleString("en-GB") + " - " + new Date(params.data.endTime).toLocaleString("en-GB");
    },
    getQuickFilterText: (params: any) => {
      return new Date(params.data.startTime).toLocaleString("en-GB") + " - " + new Date(params.data.endTime).toLocaleString("en-GB");
    },
    cellRenderer: (params: any) => (
      <div className="d-flex flex-column lh-base">
        <div>{new Date(params.data.startTime).toLocaleString("en-GB")} -</div>
        <div>{new Date(params.data.endTime).toLocaleString("en-GB")}</div>
      </div>
    ),
  },
  {
    field: "grade",
    sortable: true,
    flex: 0.5,
    headerName: "Grade",
    cellRenderer: (params: any) =>
      params.data && (
        <div>
          <b>{params.data.grade}</b>
        </div>
      ),
  },
  {
    field: "status",
    sortable: true,
    flex: 1,
    headerName: "Status",
    getQuickFilterText: (params: any) => {
      switch (params.value) {
        case 0:
          return "In progress";
        case 1:
          return "Submitted";
        case 2:
          return "Review required";
        case 3:
          return "Passed";
        case 4:
          return "Failed";
        default:
          return "Unknown";
      }
    },
    cellRenderer: (params: any) => {
      switch (params.value) {
        case 0:
          return (
            <div className="text-secondary">
              <i className="bi bi-circle ms-1 me-2"></i>
              In progress
            </div>
          );
        case 1:
          return (
            <div className="text-primary">
              <i className="bi bi-exclamation-circle-fill ms-1 me-2"></i>
              Submitted
            </div>
          );
        case 2:
          return (
            <div className="text-warning">
              <i className="bi bi-exclamation-circle-fill ms-1 me-2"></i>
              Review required
            </div>
          );
        case 3:
          return (
            <div className="text-success">
              <i className="bi bi-check-circle-fill ms-1 me-2"></i>
              Passed
            </div>
          );
        case 4:
          return (
            <div className="text-danger">
              <i className="bi bi-x-circle-fill ms-1 me-2"></i>
              Failed
            </div>
          );
        default:
          return <div className="text-danger">Unknown</div>;
      }
    },
  },
  {
    field: "showToStudent",
    sortable: true,
    flex: 1,
    headerName: "Shown to student",
    checkboxSelection: true,
    headerCheckboxSelection: true,
    headerCheckboxSelectionFilteredOnly: true,
    cellRenderer: (params: any) => params.data && <b>{params.data.showToStudent ? "Yes" : "No"}</b>,
  },
  {
    field: "",
    flex: 0.7,
    headerName: "",
    cellRenderer: (params: any) => (
      params.data.status === 0 ? <></> :
      <Button variant="outline-primary" className="w-100">
        Review
      </Button>
    ),
  },
];
