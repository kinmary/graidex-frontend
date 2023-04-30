import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Login from "./components/Login/Login";
import Signup from "./components/Login/Signup";
import CreateTest from "./components/TeacherSide/CreateTest/CreateTest";
import Dashboard from "./components/Dashboard/Dashboard";
import EditProfile from "./components/EditProfile/EditProfile";
import { withRouter } from "./utils/withRouter";
import TestOfStudent from "./components/ReviewTest/TestOfStudent";
import SubjectPage from "./components/Dashboard/SubjectPage";
import TestTab from "./components/Dashboard/TestTab";
import TakeTest from "./components/StudentSide/TakeTest/TakeTest";

function App(props) {
  useEffect(() => {
    props.navigate("/");
  }, []);

  if (!props.auth.isAuth) {
    return !props.auth.isNewUser ? <Login /> : <Signup />;
  } else {
    return (
      <Layout>
        {/* //TODO: work on back/forward in browser when states are null */}
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/edit-profile" element={<EditProfile />} />
          <Route
            exact
            path={"/" + props.main.selectedSubjectId}
            element={<SubjectPage />}
          />
          <Route
            exact
            path={"/" + props.main.selectedSubjectId + "/test"}
            element={<TestTab />}
          />
          <Route
            exact
            path={"/" + props.main.selectedSubjectId +"/test" + props.main.studentName}
            element={<TestOfStudent />}
          />
          <Route
            exact
            path={"/" + props.main.selectedSubjectId + "/new-test"}
            element={<CreateTest />}
          />
           <Route
            exact
            path={"/" + props.main.selectedSubjectId + "/test/take-test"} //TODO: edit route
            element={<TakeTest />}
          />
           <Route
            exact
            path={"/" + props.main.selectedSubjectId + "/test/edit-test"} //TODO: edit route
            element={<CreateTest />}
          />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </Layout>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    auth: state.auth,
    main: state.main,
  };
}

export default withRouter(connect(mapStateToProps, {})(App));
