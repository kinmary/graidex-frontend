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

interface LayoutProps {
  children: React.ReactNode;
}

const MainSidebar = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const main = useSelector((state: RootState) => state.main);
  const auth = useSelector((state: RootState) => state.auth);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  const mainMenuItemStyle = { paddingRight: "15px" };
  return (
    <Row>
      <Col style={{ paddingLeft: 0 }} xs={collapsed ? 1 : 2}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
        <Sidebar
          width={"100%"}
          collapsed={collapsed}
          rootStyles={{
            [`.${sidebarClasses.container}`]: {
              height: "95vh",
              backgroundColor: "white",
            },
          }}
        >
          <Menu
            menuItemStyles={{
              button: ({ level, active, disabled }) => {
                if (active) {
                  return {
                    height: "35px",
                    backgroundColor: "#e1e1e1",
                    fontWeight: "bold",
                  };
                }
                return {
                  height: "35px",
                };
              },
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
           
            <SubMenu
              style={mainMenuItemStyle}
              icon={<i className="bi bi-book"></i>}
              defaultOpen={true}
              label={<span>Subjects</span>}
            >
              {main.allSubjects &&
                main.allSubjects.map((subject: any, idx: number) => {
                  return (
                    <MenuItem
                      key={idx}
                      active={location.pathname === `/${subject.id}`}
                      onClick={() => {
                        navigate("/" + subject.id);
                      }}
                    >
                      {subject.title}
                    </MenuItem>
                  );
                })}
            </SubMenu>
            <MenuItem
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
            </MenuItem>

            <MenuItem
              style={mainMenuItemStyle}
              icon={<i className="bi bi-question-circle"></i>}
              disabled
            >
              Help
            </MenuItem>
          </Menu>
        </Sidebar>
      </Col>
      <Col xs={collapsed ? 11 : 10}>{children}</Col>
    </Row>
  );
};

export default MainSidebar;
