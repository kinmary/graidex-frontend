import React, {useEffect, useState} from "react";
import {Breadcrumb, Button, Card, Col, Form, InputGroup} from "react-bootstrap";
import {SetOpen} from "../MainAction";
import logoDark from "../../images/GraidexLogoDarkJPG.jpg";
import {getStudentsList, updateSubject} from "./SubjectActions";
import {useAppDispatch} from "../../app/hooks";
import {RootState} from "../../app/store";
import {useSelector} from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import DeleteSubjectModal from "../Modals/DeleteSubjectModal";
import ChangeImageModal from "../Modals/ChangeImageModal";
import MessageModal from "../Modals/MessageModal";
import AddStudentModal from "../Modals/AddStudentModal";
import ManageStudentsModal from "../Modals/ManageStudentsModal";
import {ISubject} from "../../interfaces/Subject";
import {getSubjRequestsOfTeacher} from "./SubjectRequestActions";

const SubjectSettings = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const main = useSelector((state: RootState) => state.main);
  const [selectedSubject, setSelectedSubject] = useState<ISubject | undefined>();
  const [selectedSubjectChanged, setSelectedSubjectChanged] = useState<ISubject | undefined>();

  useEffect(() => {
    const selectedSubject = main.allSubjects.find((obj: any) => obj.id.toString() === params.selectedSubjectId!.toString());
    setSelectedSubject(selectedSubject);
    setSelectedSubjectChanged(selectedSubject);
  }, [main.allSubjects]);

  const handleSubjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setSelectedSubjectChanged((prevSubject: ISubject | undefined) => ({
      ...prevSubject as ISubject,
      [name]: value,
    }));
  };

  const handleDeleteSubject = () => {
    dispatch(SetOpen("deleteSubjectModal", true));
  };

  const handleChangeImageClick = () => {
    dispatch(SetOpen("changeImgModal", true));
  };
  const handleUpdateSubject = () => {
    if(!selectedSubjectChanged) return;
    let {id, customId, title, imageUrl} = selectedSubjectChanged;
    dispatch(updateSubject(id, customId, title, imageUrl));
  };

  const handleManageStudents = async () => {
    if(!selectedSubject) return;
    dispatch(getStudentsList(selectedSubject.id));
    dispatch(getSubjRequestsOfTeacher(selectedSubject.id.toString()));
    dispatch(SetOpen("manageStudentsModal", true));
  };
if(!selectedSubject || !selectedSubjectChanged) return null;
  return (
    <>
      <DeleteSubjectModal selectedSubject={selectedSubject} />
      <ChangeImageModal selectedSubject={selectedSubject} />
      <MessageModal />
      <AddStudentModal selectedSubject={selectedSubject} />
      <ManageStudentsModal selectedSubject={selectedSubject} />
      <div style={{marginTop: "10px"}}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <Col xs={8}>
            <Form>
              <h5
                style={{
                  fontWeight: "bold",
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 5,
                }}
                onClick={() => {
                  navigate("/" + selectedSubject!.id);
                }}
              >
                {selectedSubject?.title}
                <Button variant="danger" size="sm" style={{marginLeft: 10}} onClick={handleDeleteSubject}>
                  Delete subject
                </Button>
              </h5>
              <Breadcrumb style={{fontSize: 14}}>
                <Breadcrumb.Item
                  linkAs={Link} linkProps={{to: '/'}}
                >
                  Dashboard
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  linkAs={Link} linkProps={{to: '/' + selectedSubject!.id}}
                >
                  {selectedSubject?.title}
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Settings</Breadcrumb.Item>
              </Breadcrumb>

              <Form.Group style={{marginTop: 20}}>
                <Form.Label>Subject name </Form.Label>
                <Form.Control type="text" name="title" autoComplete="off" placeholder="Subject name" style={{width: "40%"}} value={selectedSubjectChanged.title} onChange={handleSubjectChange} />
              </Form.Group>
              <Form.Group style={{marginTop: 20}}>
                <Form.Label>Subject Id </Form.Label>
                <Form.Control type="text" name="customId" autoComplete="off" placeholder="Subject id" style={{width: "40%"}} value={selectedSubjectChanged.customId} onChange={handleSubjectChange} />
              </Form.Group>

              {/* <Form.Group style={{ marginTop: 20 }}>
                <Form.Label>Share link </Form.Label>
                <InputGroup style={{ width: "50%" }}>
                  <InputGroup.Text>
                    <i className="bi bi-link"></i>
                  </InputGroup.Text>
                  <Form.Control readOnly value={"https://example.com/users/"} />
                  <InputGroup.Text>
                    <Button size="sm">Copy</Button>
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group> */}
              <Form.Group style={{marginTop: 20}}>
                <Form.Label>Manage Participants </Form.Label>
                <InputGroup style={{width: "40%"}}>
                  <Button variant="outline-primary" onClick={handleManageStudents}>
                    Manage Student List
                  </Button>
                </InputGroup>
              </Form.Group>
              <Form.Group style={{marginTop: 20}}>
                <InputGroup style={{width: "40%"}}>
                  <Button onClick={handleUpdateSubject}>Save changes</Button>
                </InputGroup>
              </Form.Group>
            </Form>
          </Col>
          <Col>
            <Card id="IF3333_EN" style={{marginLeft: -40, height: 350}}>
              <Card.Img variant="top" src={selectedSubject!.imageUrl ?? logoDark} style={{height: "80%", objectFit: "cover"}} />
              <Card.Body>
                <Button onClick={handleChangeImageClick} style={{width: "100%"}}>
                  Change image
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </div>
      </div>
    </>
  );
};

export default SubjectSettings;
