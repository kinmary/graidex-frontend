import React from "react";
import Header from "./Header";
import { Col, Container, Row } from "react-bootstrap";
import MainSidebar from "./MainSideBar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container
      fluid 
    ><Row >
        <Header />
    </Row >
          <MainSidebar >
          {children}
          </MainSidebar>
     
    </Container>
  );
};

export default Layout;
