import {
  AuthorizedRoute,
  GuestRoute,
  AdminRoute,
} from "./hooks/authentication/Guard";

import Layout from "./components/Layouts/Layout";
import LoadingScreen from "./components/LoadingScreen";
import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
 

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
//const Error = Loadable(lazy(() => import("./pages/error")));
//const UserProfile = Loadable(lazy(() => import("./pages/UserProfile")));
const Home = Loadable(lazy(() => import("./pages/home")));
const Login = Loadable(lazy(() => import("./pages/Login")));
const ProfileEdit=  Loadable(lazy(() => import("pages/profileEdit")));
const Profile=  Loadable(lazy(() => import("pages/profile")));
const VideoCallRef=  Loadable(lazy(() => import("pages/videoCallRef")));
//const Chat = Loadable(lazy(() => import("pages/chat/Chat")));
//const Test = Loadable(lazy(() => import("./pages/Test")));
//const Todo = Loadable(lazy(() => import("pages/Todo")));
//const UserGrid = Loadable(lazy(() => import("./pages/userManagement/UserGrid")));
//const AddNewUser = Loadable(lazy(() => import("./pages/userManagement/AddNewUser")));

const routes = [
  {
    path: "/",
    element: <Navigate to="dashboard" />,
  },
  {
    path: "login",
    element: (
      <GuestRoute>
        <Login />
      </GuestRoute>
    ),
  },
  {
    path: "videocall",
    element: (
     
        <VideoCallRef />
     
    ),
  },
  {
    path: "dashboard",
    element: (
      <AuthorizedRoute>
        <Layout />
      </AuthorizedRoute>
    ),
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "profileedit",
        element: <ProfileEdit />,
      },{
        path: "profile",
        element: <Profile />,
      },
       
      // {
      //   path: "Todo",
      //   element: <Todo />,
      // },
      // {
      //   path: "test",
      //   element: (
      //     <AdminRoute>
      //       <Test />
      //     </AdminRoute>
      //   ),
      // },
    ],
  },
  // {
  //   path: "/error",
  //   element: <Error />,
  // },
];
export default routes;
