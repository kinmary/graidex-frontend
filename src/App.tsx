import React, {useEffect, useState} from "react";
import {useAppDispatch} from "./app/hooks";
import {useSelector} from "react-redux";
import {RootState} from "./app/store";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import CreateTest from "./components/TeacherSide/CreateTest/CreateTest";
import Dashboard from "./components/Dashboard/Dashboard";
import EditProfile from "./components/EditProfile/EditProfile";
import TestOfStudent from "./components/ReviewTest/TestOfStudent";
import SubjectPage from "./components/Dashboard/SubjectPage";
import TestTab from "./components/Dashboard/TestTab";
import TakeTest from "./components/StudentSide/TakeTest/TakeTest";
import {Outlet, RouterProvider, createBrowserRouter} from "react-router-dom";
import {CheckAuthentication} from "./components/Auth/AuthAction";
import Layout from "./components/Layout";
import SubjectSettings from "./components/Dashboard/SubjectSettings";
import Settings from "./components/Dashboard/Settings";
import SubjectRequests from "./components/Dashboard/SubjectRequests";
import StartTestSummary from "./components/StudentSide/TakeTest/StartTestSummary";
import {SetOpen} from "./components/MainAction";
import {themes} from "./constants/Themes";

const ProtectedRoute = ({role}: any) => {
  const auth = useSelector((state: RootState) => state.auth);
  if (auth.isAuth && auth.userRole === role) {
    return <Outlet />;
  }
  return null;
};

function App() {
  const dispatch = useAppDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const theme = useSelector((state: RootState) => state.main.theme);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    let theme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-bs-theme", theme);
    dispatch(SetOpen("theme", theme));
    dispatch(CheckAuthentication()).then(() => {
      setDataLoaded(true);
    });
  }, []);

  const teacherRoutes = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <h1>Not found</h1>,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/edit-profile",
          element: <EditProfile />,
        },
        {
          path: "/:selectedSubjectId",
          element: <SubjectPage />,
        },
        {
          element: <ProtectedRoute role={0} />, //teacher
          children: [
            {
              path: "/:selectedSubjectId/settings",
              element: <SubjectSettings />,
            },
            {
              path: "/:selectedSubjectId/:test",
              element: <TestTab />,
            },
            {
              path: "/:selectedSubjectId/:test/settings",
              element: <Settings />,
            },
            {
              path: "/:selectedSubjectId/:test/edit-test",
              element: <CreateTest />,
            },
            {
              path: "/:selectedSubjectId/:test/review/:testResultId",
              element: <TestOfStudent />,
            },
          ],
        },
      ],
    },
  ]);
  const studentRoutes = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <h1>Not found</h1>,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/edit-profile",
          element: <EditProfile />,
        },
        {
          path: "/:selectedSubjectId",
          element: <SubjectPage />,
        },
        {
          element: <ProtectedRoute role={1} />, //student
          children: [
            {
              path: "/subject-requests",
              element: <SubjectRequests />,
            },
            {
              path: "/:selectedSubjectId/:test",
              element: <StartTestSummary />,
            },
            {
              path: "/:selectedSubjectId/:test/:testResultId",
              element: <TakeTest />,
            },
            {
              path: "/:selectedSubjectId/:test/review/:testResultId",
              element: <TestOfStudent />,
            },
          ],
        },
      ],
    },
  ]);

  let layout = null;
  if (!dataLoaded) {
    return null;
  }
  if (!auth.isAuth) {
    layout = auth.isNewUser ? <SignUp /> : <Login />;
  }

  return (
    <>
      {layout || (
        <div className="App" style={{height: "100%", backgroundColor: theme === themes.light ? "#f5f7fa" : "#12171c"}}>
          {auth.userRole === 0 ? <RouterProvider router={teacherRoutes} /> : <RouterProvider router={studentRoutes} />}
        </div>
      )}
    </>
  );
}

export default App;
