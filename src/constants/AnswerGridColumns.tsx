import { Col, Form, Image, Row, Spinner } from "react-bootstrap";
import profilePic from "../images/blank-profile-picture.jpg";

export const AnswerGridCol = [
  {
    minWidth: 200,
    sortable: true,
    unSortIcon: true,
    field: "student",
    flex: 2,
    autoWidth: true,
    autoHeight: true,
    headerName: "Student",
    getQuickFilterText: (params: any) => {
      console.log(params);
      return (params.value.name + "\n" + params.value.customId);
    },
    cellRenderer: (params: any) => (
      <div className="d-flex my-1">
        <div className="d-flex flex-column">
          <Image className="profile-image my-1 ms-0 me-2" src={params.value.profileImage || profilePic} />
        </div>
        <div className="d-flex flex-column lh-base">
            <div>{params.value.name}</div>
            <div>{params.value.customId}</div>
        </div>
      </div>
    ),
    // pinned: true,
  },
  {
    minWidth: 175,
    field: "startEnd",
    sortable: true,
    unSortIcon: true,
    flex: 1.5,
    autoHeight: true,
    headerName: "Timeline",
    getQuickFilterText: (params: any) => {
      return (params.value.start + " - " + params.value.end);
    },
    cellRenderer: (params: any) => (
      <div className="d-flex flex-column lh-base">
            <div>{params.value.start} -</div>
            <div>{params.value.end}</div>
      </div>
    ),
  },
  { 
    minWidth: 100,
    field: "grade", 
    sortable: true,
    unSortIcon: true,
    flex: 1, 
    headerName: "Grade",
    cellRenderer: (params: any) => (
      params.value && (
      <div>
        <b>{params.value.grade}</b> ({params.value.percent}%)
        </div>)
    ),
  },
  // { 
  //   minWidth: 100,
  //   field: "isShown",
  //   sortable: true,
  //   unSortIcon: true,
  //   flex: 1, 
  //   headerName: "Shown?",
  //   getQuickFilterText: (params: any) => {
  //     return (params.value ? "Yes" : "No");
  //   },
  //   cellRenderer: (params: any) => (
  //     <Form.Select size="sm" className="mt-2">
  //       <option selected={!params.value} value={0}>No</option>
  //       <option selected={params.value} value={1}>Yes</option>
  //   </Form.Select>
  //   ),
  // },
  { 
    minWidth: 125,
    field: "status", 
    sortable: true,
    unSortIcon: true,
    flex: 1, 
    headerName: "Status", 
    getQuickFilterText: (params: any) => {
      switch (params.value){
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
          return "?";
      };
    },
    cellRenderer: (params: any) => 
      {
        switch (params.value) {
          case 0:
            return (
            <div className="text-secondary">
              <i className="bi bi-circle ms-1 me-2"></i>
              In progress
              </div>);
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
            return (<div className="text-danger">?</div>);
      }}
    
    },
    {
      minWidth: 50,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
      flex: 0.5,
    },
];