import {Image, Spinner} from "react-bootstrap";
import profilePic from "../images/blank-profile-picture.jpg";

export const AnswerGridCol = [
  {
    sortable: true,
    unSortIcon: true,
    field: "student",
    flex: 1,
    autoWidth: true,
    autoHeight: true,
    headerName: "Student",
    getQuickFilterText: (params: any) => {
      return params.data.student.name + " " + params.data.student.surname + "\n" + params.data.student.customId;
    },
    cellRenderer: (params: any) => (
      <div className="d-flex my-1">
        <div className="d-flex flex-column">
          {/* <Image className="profile-image my-1 ms-0 me-2" src={params.value.profileImage || profilePic} /> */}
        </div>
        <div className="d-flex flex-column lh-base">
          <div style={{fontWeight: "bold"}}>
            {params.data.student.name} {params.data.student.surname}
          </div>
          <div>{params.data.student.customId}</div>
        </div>
      </div>
    ),
    // pinned: true,
  },
  {
    field: "startEnd",
    sortable: true,
    unSortIcon: true,
    flex: 1.5,
    autoHeight: true,
    headerName: "Timeline",
    getQuickFilterText: (params: any) => {
      return new Date(params.data.startTime).toLocaleString('en-GB') + " - " + new Date(params.data.endTime).toLocaleString('en-GB');
    },
    cellRenderer: (params: any) => (
      <div className="d-flex flex-column lh-base">
        <div>{new Date(params.data.startTime).toLocaleString('en-GB')} -</div>
        <div>{new Date(params.data.endTime).toLocaleString('en-GB')}</div>
      </div>
    ),
  },
  {
    field: "grade",
    sortable: true,
    unSortIcon: true,
    flex: 1,
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
    unSortIcon: true,
    flex: 1,
    headerName: "Status",
    getQuickFilterText: (params: any) => {
      switch (params.value) {
        case 0:
          return "In progress";
        case 1:
          return "Submitted";
        case 2:
          return "Autochecking...";
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
            <div className="text-secondary">
              <Spinner animation="border" size="sm" className="me-2" />
              Checking...
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
    field: "canReview",
    sortable: true,
    unSortIcon: true,
    flex: 1,
    headerName: "Can review",
    cellRenderer: (params: any) =>
      params.data && (
        <div>
          <b>{params.data.canReview ? "Yes" : "No"}</b>
        </div>
      ),
  },
  {
    headerCheckboxSelection: true,
    headerCheckboxSelectionFilteredOnly: true,
    checkboxSelection: true,
    flex: 0.5,
  },

];
