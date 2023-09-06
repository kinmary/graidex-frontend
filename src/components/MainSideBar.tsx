import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import {
  Menu,
  MenuItem,
  Sidebar,
  SubMenu,
  sidebarClasses,
} from "react-pro-sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { getSubjectContent } from "./Dashboard/SubjectActions";
import { useAppDispatch } from "../app/hooks";

interface LayoutProps {
  children: React.ReactNode;
}

const MainSidebar = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const main = useSelector((state: RootState) => state.main);
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const storedValue = localStorage.getItem("mainsidebarState");
  const initialState = storedValue ? JSON.parse(storedValue) : false;
  const [collapsed, setCollapsed] = useState(initialState);
  const location = useLocation();
  const handleToggleCollapse = () => {
    localStorage.setItem("mainsidebarState", JSON.stringify(!collapsed));
    setCollapsed(!collapsed);
  };
  const mainMenuItemStyle = { paddingRight: "15px" };

  const subjectRegEx = /^\/[0-9]+/;

  return (
    <Row>
      <Col style={{
         paddingLeft: 0, 
         position: "sticky", 
         top: "46.67px", 
         height: "fit-content",
         zIndex: 1040,
         width: collapsed ? "80px" : "240px",
         flex: "0 0 auto",
        }} 
        >

        <Sidebar
          width={"100%"}
          collapsed={collapsed}
          rootStyles={{
            [`.${sidebarClasses.container}`]: {
              height: "calc(100vh - 46.67px)",
              backgroundColor: "white",
            },
          }}
        >
          <div style={{
            display: "flex", 
            justifyContent: "space-between",
            flexDirection: "column",
            height: "100%"
            }}>
            <Menu
              menuItemStyles={{
                button: ({ level, active, disabled }) => {
                  if (active) {
                    return {
                      height: "35px",
                      backgroundColor: "#e1e1e1",
                      fontWeight: "bold",
                      paddingLeft: collapsed ? "" : "3.7px",
                    };
                  }
                  return {
                    height: "35px",
                    paddingLeft: collapsed ? "" : "3.7px",
                  };
                },

                icon: () => {
                  return {
                    fontSize: "1.15rem",
                    marginRight: collapsed ? "" : "3.7px",
                  };
                }
              
              }}
            >
              <MenuItem
                style={{ ...mainMenuItemStyle, marginTop: "9px" }}
                icon={
                  location.pathname === `/` ? (
                    <i className="bi bi-house-fill"></i>
                  ) : (
                    <i className="bi bi-house"></i>
                  )
                }
                onClick={() => navigate("/")}
              >
                Dashboard
              </MenuItem>
              
            
              <SubMenu
                style={mainMenuItemStyle}
                icon={
                  subjectRegEx.test(location.pathname) ? (
                    <i className="bi bi-book-half"></i>
                  ) : (
                    <i className="bi bi-book"></i>
                  )
                }
                defaultOpen={true}
                label={<span>Subjects</span>}
              >
                {main.allSubjects &&
                  main.allSubjects.map((subject: any, idx: number) => {
                    return (
                      <MenuItem
                        style={{ 
                          paddingLeft: "20px",
                          marginLeft: collapsed ? "" : "20px",
                          borderLeft: collapsed ? "" : "2px #212529 solid",
                        }}
                        key={idx}
                        active={location.pathname === `/${subject.id}`}
                        onClick={() => {
                          auth.userRole === 0 ? dispatch(getSubjectContent(false, subject.id)) : dispatch(getSubjectContent(true, subject.id));
                          navigate("/" + subject.id);
                        }}
                      >
                        {subject.title}
                      </MenuItem>
                    );
                  })}
              </SubMenu>

              {auth.userRole === 1 &&  <MenuItem
                style={mainMenuItemStyle}
                icon={
                  location.pathname === "/subject-requests" ? (
                    main.subjectRequests && main.subjectRequests.length > 0 ? <i className="bi bi-envelope-exclamation-fill"></i>  : <i className="bi bi-envelope-fill"></i> 
                  ) : (
                    main.subjectRequests && main.subjectRequests.length > 0 ? <i className="bi bi-envelope-exclamation"></i>  :<i className="bi bi-envelope"></i>
                  )
                }
                onClick={() => navigate("/subject-requests")}
              >
                Requests
              </MenuItem>}

              {/* <MenuItem
                style={mainMenuItemStyle}
                icon={<i className="bi bi-info-circle"></i>}
                disabled
              >
                About
              </MenuItem>
              <MenuItem
                style={mainMenuItemStyle}
                icon={<i className="bi bi-shield-check"></i>}
                disabled
              >
                Privacy &amp; Policy
              </MenuItem> */}

              <MenuItem
                style={mainMenuItemStyle}
                icon={<i className="bi bi-question-circle"></i>}
                disabled
              >
                Help & Feedback
              </MenuItem>
            </Menu>
            <div style={{ 
              display: "flex", 
              justifyContent:  collapsed? "center" : "flex-end",
              }}>
              <Button
                variant="link"
                size="lg"
                onClick={handleToggleCollapse}
                className="text-dark"
              >
                {collapsed ? (
                  <i className="bi bi-arrow-right-circle"></i>
                ) : (
                  <i className="bi bi-arrow-left-circle"></i>
                )}
              </Button>
            </div>
          </div>
        </Sidebar>
      </Col>
      <Col 
      style={{ 
        width: `calc(100% - ${collapsed ? "80px" : "240px"})`,
        flex: "0 0 auto",
      }}
      >
        {children}
      </Col>
    </Row>
  );
};

export default MainSidebar;
