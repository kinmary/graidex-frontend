import React, { useState } from "react";
import { Button, Card, Col, Nav, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../app/hooks";
import { RootState } from "../app/store";
import {
  Menu,
  MenuItem,
  MenuItemStylesParams,
  ProSidebarProvider,
  Sidebar,
  SubMenu,
  menuClasses,
  sidebarClasses,
} from "react-pro-sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { SetOpen } from "./MainAction";

interface LayoutProps {
  children: React.ReactNode;
}

const MainSidebar = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const main = useSelector((state: RootState) => state.main);
  const auth = useSelector((state: RootState) => state.auth);

  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

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
            <SubMenu
              style={{ fontWeight: "bold", marginTop: "9px" }}
              label={
                <span>
                  <i className="bi bi-book"></i> Subjects
                </span>
              }
            >
              {main.allSubjects &&
                main.allSubjects.map((subject: any, idx: number) => {
                  return auth.userRole === 0 ? (
                    <SubMenu
                      key={idx}
                      defaultOpen={location.pathname.startsWith(
                        `/${subject.id}`
                      )}
                      label={
                        <span style={{ fontWeight: "bold" }}>
                          {subject.title}
                        </span>
                      }
                    >
                      {/* <SubMenu
                        label="Tests"
                        onClick={() => navigate(subject.id)}
                      >
                        //TODO: take tests from backend of each subject
                        {main.tests &&
                          main.tests.map((test: any, idx: number) => {
                            return (
                              <MenuItem key={idx}>{test.examName}</MenuItem>
                            );
                          })}
                      </SubMenu> */}
                      <MenuItem
                        onClick={() => {
                          navigate("/" + subject.id);
                        }}
                        active={location.pathname === `/${subject.id}`}
                      >
                        Tests
                      </MenuItem>
                      {/* <MenuItem>Students</MenuItem> */}
                      <MenuItem
                        onClick={() => {
                          navigate("/" + subject.id + "/settings");
                        }}
                        active={location.pathname === `/${subject.id}/settings`}
                      >
                        <i className="bi bi-gear"></i> Settings
                      </MenuItem>{" "}
                    </SubMenu>
                  ) : (
                    <MenuItem
                      onClick={() => {
                        navigate("/" + subject.id);
                      }}
                      active={location.pathname === `/${subject.id}`}
                    >
                      {subject.title}
                    </MenuItem>
                  );
                })}
            </SubMenu>
            <MenuItem disabled>
              <i className="bi bi-info-circle" style={{ marginRight: 2 }}></i>
              About
            </MenuItem>
            <MenuItem disabled>
              <i className="bi bi-shield-check" style={{ marginRight: 2 }}></i>
              Privacy &amp; Policy
            </MenuItem>
            <MenuItem
              active={location.pathname.startsWith("/edit-profile")}
              onClick={() => navigate("/edit-profile")}
            >
              <i className="bi bi-person" style={{ marginRight: 2 }}></i>
              Account Settings
            </MenuItem>
            <MenuItem disabled>
              <i
                className="bi bi-question-circle"
                style={{ marginRight: 2 }}
              ></i>
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
