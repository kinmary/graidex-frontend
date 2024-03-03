import { Badge, Col, Row, Image, Navbar, NavDropdown } from "react-bootstrap";
import logo from "../images/GraidexLogoLightSVG.svg";
import logoDark from "../images/GraidexLogoDarkSVG.svg";
import profilePic from "../images/blank-profile-picture.jpg";
import "../styles/header.css";
import { SetOpen } from "./MainAction";
import { ResetCreateTestState } from "./TeacherSide/CreateTest/CreateTestActions";
import { ResetTestOfStudentState } from "./ReviewTest/TestOfStudentActions";

import { useAppDispatch } from "../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useNavigate } from "react-router-dom";
import { Logout } from "./Auth/AuthAction";
import { themes } from "../constants/Themes";

const Header = () => {
  const dispatch = useAppDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const theme = useSelector((state: RootState) => state.main.theme);

  const handleThemeChange = () => {
    const selectedTheme = theme === themes.light ? themes.dark : themes.light;
    localStorage.setItem('theme', selectedTheme);
    document.documentElement.setAttribute('data-bs-theme', selectedTheme);
    dispatch(SetOpen("theme", selectedTheme));
  };

  const navigate = useNavigate();
  const handleEditProfile = () => {
    dispatch(SetOpen("editPage", true));
    navigate("/edit-profile");
  };
  const handleLogoClick = () => {
    navigate("/");
    dispatch(ResetCreateTestState());
    dispatch(ResetTestOfStudentState());
    dispatch(SetOpen("editPage", false));
    dispatch(SetOpen("createTestPage", false));
    dispatch(SetOpen("testOfStudentPage", false));
    dispatch(SetOpen("studentName", ""));
    dispatch(SetOpen("selectedTest", null));
  };

  const handleLogOut = () => {
    dispatch(ResetCreateTestState());
    dispatch(ResetTestOfStudentState());
    dispatch(Logout());
    navigate("/");
  };

  return (
    <Navbar
      fixed="top"
      // bg="white"
      style={{
        paddingLeft: 12,
        paddingRight: 12,
        display: "flex",
        alignItems: "center",
        borderBottom: `1px ${ theme === themes.light ? "#dde0e4" : "#212529"} solid`,
      }}
    >
      <Image
        src={theme === themes.light ? logo : logoDark}
        width="100"
        style={{ marginRight: 10 }}
        onClick={handleLogoClick}
      />
      <div style={{ display: "block", marginTop: -5 }}>
        <Badge
          pill
          bg={auth.userRole === 0 ? "primary" : "info"}
          style={{ fontSize: 10 }}
        >
          {auth.userRole === 0 ? "Teacher" : "Student"}
        </Badge>
      </div>

      <div
      className="d-flex align-items-center fs-5"
      style={{
        marginLeft: "auto",
        marginRight: "10px",
      }}>
        {/* <i className="bi bi-bell text-muted"></i> */}
      </div>

      <div
        className="user-profile"
        style={{
          marginLeft: "0",
          marginRight: "0",
        }}
      >
        <NavDropdown
          className="dropdown-no-after"
          align="end"
          id="basic-nav-dropdown"
          title={
            <>
              <Image className="profile-image" src={auth.profilePic || profilePic}  />
            </>
          }
        >
          
          <NavDropdown.ItemText className="flex-nowrap">
            <Row className="flex-nowrap">
              <Col className="pe-0">
                <Image className="rounded-circle" src={auth.profilePic || profilePic} style={{height: "3rem", width: "3rem", objectFit: "cover"}} />
              </Col>
              <Col>
                  <span className="h6 text-nowrap">
                    {auth.name} {auth.surname}
                  </span>
                  <br />
                  <span className="text-muted text-nowrap">
                    {auth.email}
                  </span>
              </Col>
            </Row>
          </NavDropdown.ItemText>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={handleEditProfile}>
            <i className="bi bi-gear me-2" style={{ marginRight: 5 }}></i>
            Settings
          </NavDropdown.Item>
          <NavDropdown.Item disabled>
            <i className="bi bi-translate me-2" style={{ marginRight: 5 }}></i>
            Language
          </NavDropdown.Item>
          <NavDropdown.Item onClick={handleThemeChange}>
            <i className={ theme === themes.light ? "bi bi-brightness-high me-2" : "bi bi-moon-stars me-2"}></i>
            Theme: {theme === themes.light ? "Light" : "Dark"}
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={handleLogOut}>
            <i className="bi bi-box-arrow-right me-2" style={{ marginRight: 5 }}></i>
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      </div>
    </Navbar>
  );
};

export default Header;
