import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import CreateTest from './components/TeacherSide/CreateTest/CreateTest';
import AnswersGrid from './components/TeacherSide/Dashboard/AnswersGrid';
import Dashboard from './components/TeacherSide/Dashboard/Dashboard';
import TestsGrid from './components/TeacherSide/Dashboard/TestsGrid';
import EditProfile from './components/TeacherSide/EditProfile/EditProfile';
import { withRouter } from './utils/withRouter';

function App(props) {
  useEffect(() => {
    props.navigate("/");
  }, []);

  if (!props.auth.isAuth) {
    return (!props.auth.isNewUser ? <Login /> : <Signup /> );
  } else {
    return (
      <Layout>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/edit-profile" element={<EditProfile />} />
          <Route exact  path={"/"+ props.main.selectedSubjectId} element={<TestsGrid />} />
          <Route  exact path={"/"+ props.main.selectedSubjectId+"/test"} element={<AnswersGrid />} />
          <Route exact path={"/"+ props.main.selectedSubjectId + "/new-test"} element={<CreateTest />} />
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

export default withRouter(connect(mapStateToProps, {  })(App));
