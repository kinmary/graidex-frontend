import React, { useEffect } from "react";
import { useAppDispatch } from "./app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import CreateTest from "./components/TeacherSide/CreateTest/CreateTest";
import Dashboard from "./components/Dashboard/Dashboard";
import EditProfile from "./components/EditProfile/EditProfile";
import TestOfStudent from "./components/ReviewTest/TestOfStudent";
import SubjectPage from "./components/Dashboard/SubjectPage";
import TestTab from "./components/Dashboard/TestTab";
import TakeTest from "./components/StudentSide/TakeTest/TakeTest";
import { Route, Routes, useNavigate } from "react-router-dom";
import { CheckAuthentication } from "./components/Auth/AuthAction";
import Layout from "./components/Layout";
import SubjectSettings from "./components/Dashboard/SubjectSettings";
import Settings from "./components/Dashboard/Settings";
import SubjectRequests from "./components/Dashboard/SubjectRequests";

function App() {
  const dispatch = useAppDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {   
     //navigate("/");
    dispatch(CheckAuthentication());
  }, []);

  let layout = null;
  if (!auth.isAuth) {
    layout = auth.isNewUser ? <SignUp /> : <Login />;
  }

  return (
    <div className="App" style={{ height: "100%" }}>
      {layout || (
        <Layout>
          <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="edit-profile" element={<EditProfile />} />
          {auth.userRole === 1 && <Route path="subject-requests" element={<SubjectRequests />} />}
          <Route path=":selectedSubjectId" element={<SubjectPage />} />
          {auth.userRole === 0 &&<Route path=":selectedSubjectId/settings" element={<SubjectSettings />} />}
          {/* //TODO: change paths to test id or name  */}
          {auth.userRole === 0 && <Route path=":selectedSubjectId/test" element={<TestTab />} />}
         {auth.userRole === 0 && <Route path=":selectedSubjectId/test/settings" element={<Settings />} />}
          <Route path=":selectedSubjectId/test/take-test" element={<TakeTest />} />
          <Route path=":selectedSubjectId/test/edit-test" element={<CreateTest />} />
          <Route path=":selectedSubjectId/test/:studentName" element={<TestOfStudent />} />
          <Route path=":selectedSubjectId/new-test" element={<CreateTest />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
        </Layout>
        
      )}
    </div>
  );
}

export default App;
