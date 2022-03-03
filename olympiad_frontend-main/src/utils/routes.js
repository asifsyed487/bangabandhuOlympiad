import Home from "../views/Home";
import Login from "../views/Login";
import AdminLogin from "../views/AdminLogin";
import SignUp from "../views/SignUp";
import Subjects from "../views/Subjects";
import Chapters from "../views/Chapters";
import Challenge from "../views/Challenge";
import Game from "../views/Game";
import JoinGame from "../views/JoinGame";

import SinglePlayer from "../views/SinglePlayer";
import MultiMediaMode from "../views/MultiMediaMode";
import ResultSingle from "../views/ResultSingle";
import ResultMultiplayer from "../views/ResultMultiplayer";
import ResultBoard from "../views/ResultBoard";
import PrivacyPolicy from "../views/PrivacyPolicy";
import LeaderBoard from "../views/LeaderBoard";
import Settings from "../views/Settings";
import Profile from "../views/Profile";
import LayoutDefault from "../layouts/LayoutDefault";
import LayoutloggedIn from "../layouts/LayoutloggedIn";
import LayoutAdmin from "../layouts/LayoutAdmin";
import Error404 from "../views/404";
import NoQuestion from "../views/NoQuestion";
import BoardDashboard from "../views/BoardDashboard";
import DashboardSchool from "../views/DashboardSchool";
import dashboardProfile from "../views/dashboardProfile";
import ForgetPassword from "../views/ForgetPassword";
import Howtoplay from "../views/Howtoplay";
import SchoolLogin from "../views/SchoolLogin";
import Schooldashboard from "../views/schooldashboard";
import Maintaince from "../views/Maintaince";

export const routes = [
  {
    path: "/",
    component: Home,
    exact: true,
    layout: LayoutDefault,
  },
  {
    path: "/login",
    component: Login,
    exact: true,
    layout: LayoutDefault,
  },

  {
    path: "/signup",
    component: SignUp,
    exact: true,
    layout: LayoutDefault,
  },
  {
    path: "/forgetpass",
    component: ForgetPassword,
    exact: true,
    layout: LayoutDefault,
  },

  {
    path: "/dashboardschool",
    component: DashboardSchool,
    exact: true,
  },

  {
    path: "/dashboardprofile",
    component: dashboardProfile,
    exact: false,
  },
  {
    path: "/privacypolicy",
    component: PrivacyPolicy,
    exact: true,
    layout: LayoutDefault,
  },
  {
    path: "/schooladminlogin",
    component: SchoolLogin,
    exact: true,
    layout: LayoutDefault,
  },
  {
    path: "/adminlogin",
    component: AdminLogin,
    exact: true,
    layout: LayoutDefault,
  },
  {
    path: "/dashboard",
    component: BoardDashboard,
    exact: true,
    layout: LayoutAdmin,
  },
  {
    path: "/Schooldashboardadmin",
    component: Schooldashboard,
    exact: true,
    layout: LayoutAdmin,
  },
  {
    path: "/dashboardprofile",
    component: dashboardProfile,
    exact: true,
    layout: LayoutAdmin,
  },
  {
    path: "/resultboard",
    component: ResultBoard,
    exact: true,
    layout: LayoutAdmin,
  },
];
// export const maintainanceRoutes = [
//   {
//     path: "/",
//     component: Maintaince,
//     exact: true,
//     layout: LayoutDefault,
//   },
// ];

export const adminroutes = [];

export const private_routes = [
  {
    path: "/subjects",
    component: Subjects,
    exact: true,
    layout: LayoutloggedIn,
  },
  {
    path: "/chapters",
    component: Chapters,
    exact: true,
    layout: LayoutloggedIn,
  },
  {
    path: "/challenge",
    component: Challenge,
    exact: true,
    layout: LayoutloggedIn,
  },
  {
    path: "/game",
    component: Game,
    exact: true,
    layout: LayoutloggedIn,
  },
  {
    path: "/joingame",
    component: JoinGame,
    exact: true,
    layout: LayoutloggedIn,
  },

  {
    path: "/singleplayer",
    component: SinglePlayer,
    exact: true,
    layout: LayoutloggedIn,
  },
  {
    path: "/mediamode",
    component: MultiMediaMode,
    exact: true,
    layout: LayoutloggedIn,
  },
  {
    path: "/settings",
    component: Settings,
    exact: true,
    layout: LayoutloggedIn,
  },

  {
    path: "/resultsingle",
    component: ResultSingle,
    exact: true,
    layout: LayoutloggedIn,
  },
  {
    path: "/resultmuilti",
    component: ResultMultiplayer,
    exact: true,
    layout: LayoutloggedIn,
  },
  {
    path: "/leaderboard",
    component: LeaderBoard,
    exact: true,
    layout: LayoutloggedIn,
  },
  {
    path: "/profile/:id",
    component: Profile,
    exact: false,
    layout: LayoutloggedIn,
  },
  {
    path: "/noquestion",
    component: NoQuestion,
    exact: true,
    layout: LayoutloggedIn,
  },
  {
    path: "/howtoplay",
    component: Howtoplay,
    exact: true,
    layout: LayoutloggedIn,
  },

  {
    path: "",
    component: Error404,
    exact: false,
    layout: LayoutloggedIn,
  },
];
