import SidebarMenu from "react-bootstrap-sidebar-menu";
import { Card, Col, Nav, Row } from "react-bootstrap";
import { SetSelectedQ } from "./TakeTestActions";
import { useAppDispatch } from "../../../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

const  SideBarMenu = () => {
  const dispatch = useAppDispatch();
  const takeTest = useSelector((state: RootState) => state.takeTest);
  const handleCardClick = (event: any) => {
    dispatch(SetSelectedQ(event.currentTarget.id));
  }

    const {questions} = takeTest;
    return (
      <Nav className="left-sidebar">
        <SidebarMenu>
          <SidebarMenu.Header>
            <SidebarMenu.Brand
              as="h3"
              style={{
                fontWeight: "bold",
                textAlign: "left",
                marginLeft: 20,
                color: "#000a55",
              }}
            >
              Questions
            </SidebarMenu.Brand>
          </SidebarMenu.Header>
          <SidebarMenu.Body
            style={{ marginTop: 10, marginLeft: 30, marginRight: 20 }}
          >
            <Row xs={1} md={3}>
              {questions && questions.map((question: any, idx: any) => (
                <Col key={idx} style={{ padding: 2}}>
                  <Card 
                  onClick={handleCardClick}
                  key={idx}
                    className="text-center"
                    id={question.id.toString()}
                   
                    style={{
                         padding: "5px",
                         border: question.selected ? "1px solid #000a55" : undefined,                         
                    }}
                    text="dark"
                  >
                    <Card.Text>{idx + 1}</Card.Text>
                  </Card>
                </Col>
              ))}
            </Row>
          </SidebarMenu.Body>
        </SidebarMenu>
      </Nav>
    );
  }



export default SideBarMenu;
