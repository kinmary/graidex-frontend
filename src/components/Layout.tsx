import React, { useEffect } from "react";
import Header from "./Header";
import { Col, Container, Row } from "react-bootstrap";
import MainSidebar from "./MainSideBar";
import { Outlet } from "react-router-dom";
import { getAllSubjects } from "./Dashboard/SubjectActions";
import { useAppDispatch } from "../app/hooks";

const Layout = () => {
  const dispatch = useAppDispatch();
  useEffect(()=>{
    dispatch(getAllSubjects());
  }, [])
  return (
    <Container
      fluid 
    ><Row >
        <Header />
    </Row >
          <MainSidebar >
          <Outlet />
          </MainSidebar>
    </Container>
  );
};

export default Layout;
