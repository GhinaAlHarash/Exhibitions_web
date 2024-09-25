import { createBrowserRouter, useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import Home from "../Pages/Home";
import Welcome from "../Pages/Welcome";
import Dashboard from "../Pages/Dashboard";
import MainHome from "../components/MainHome";
import ExhTable from "../components/ExhTable";
import MainInfo from "../components/MainInfo";
import Companies from "../components/Companies";
import Reports from "../components/Reports";
import Employee from "../components/Employee";
import AppSections from "../components/AppSections";
import ExhRequests from "../components/ExhRequests";
import NewExh from "../components/NewExh";
import ExhSearch from "../components/ExhSearch";
import NavigateToLogin from "../Pages/NavigateToLogin";
import Stands from "../components/Stands";
import Schedule from "../components/Schedule";
import AvailableExhs from "../components/AvailableExhs";
import Profile from "../components/Profile";
import CompShowExh from "../components/CompShowExh";
import JoinRequests from "../components/JoinRequests";
import ProfileComp from "../components/ProfileComp";
import AllCompanies from "../components/AllCompanies";
import Visitors from "../components/Visitors";
import SearchComp from "../components/SearchComp";
import VisSearch from "../components/VisSearch";
import HomeExhs from "../components/HomeExhs";
import HomeMainInfo from "../components/HomeMainInfo";

const isAuthenticated = () => {
  return localStorage.getItem("userToken") !== null;
};
const isAdmin = () => {
  return localStorage.getItem("useroles") == "admin";
};
const isOrganizer = () => {
  return localStorage.getItem("useroles") == "organizer";
};
const isEmployee = () => {
  return localStorage.getItem("useroles") == "employee";
};

const isCompany = () => {
  return localStorage.getItem("useroles") == "company";
};

const isEmployeeUser = () => {
  return localStorage.getItem("useroles") == "employeeUser";
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      { index: true, element: <MainHome /> },
      { path: "exhabitations", element: <HomeExhs /> },
      { path: "exhabitations/info", element: <HomeMainInfo /> },
    ],
  },
  { path: "/login", element: <Welcome /> },
  {
    path: "/dash",
    element: isAuthenticated() ? <Dashboard /> : <NavigateToLogin />,
    children: [
      {
        index: false,
        element: isAuthenticated() ? (
          isAdmin() ? (
            <Employee />
          ) : (
            <ExhTable />
          )
        ) : (
          <NavigateToLogin />
        ),
      },
      {
        path: "exhabitations",
        element: isAuthenticated() ? <ExhTable /> : <NavigateToLogin />,
      },
      {
        path: "ExhInfo/:id",
        element: isAuthenticated() ? <MainInfo /> : <NavigateToLogin />,
      },
      {
        path: "ShowExh/:id",
        element:
          isAuthenticated() && isCompany() ? (
            <CompShowExh />
          ) : (
            <NavigateToLogin />
          ),
      },
      {
        path: "stands/:id",
        element:
          isAuthenticated() &&
          (isEmployee() || isOrganizer() || isCompany()) ? (
            <Stands />
          ) : (
            <NavigateToLogin />
          ),
      },
      {
        path: "companies/:id",
        element:
          isAuthenticated() && (isEmployee() || isOrganizer()) ? (
            <Companies />
          ) : (
            <NavigateToLogin />
          ),
      },
      {
        path: "reports/:id",
        element:
          isAuthenticated() && (isEmployee() || isOrganizer()) ? (
            <Reports />
          ) : (
            <NavigateToLogin />
          ),
      },

      {
        path: "visitors",
        element:
          isAuthenticated() && isEmployeeUser() ? (
            <Visitors />
          ) : (
            <NavigateToLogin />
          ),
      },

      {
        path: "companies",
        element:
          isAuthenticated() ? (
            <AllCompanies />
          ) : (
            <NavigateToLogin />
          ),
      },

      {
        path: "companies/requests",
        element: isAuthenticated() ? <JoinRequests /> : <NavigateToLogin />,
      },

      {
        path: "wallets",
        element:
          isAuthenticated() && isEmployeeUser() ? (
            <Reports />
          ) : (
            <NavigateToLogin />
          ),
      },
      {
        path: "schedule/:id",
        element:
          isAuthenticated() &&
          (isEmployee() || isOrganizer() || isCompany()) ? (
            <Schedule />
          ) : (
            <NavigateToLogin />
          ),
      },
      {
        path: "profile",
        element: isAuthenticated() ? <Profile /> : <NavigateToLogin />,
      },

      {
        path: "viewProfile",
        element: isAuthenticated() ? <ProfileComp /> : <NavigateToLogin />,
      },
      {
        path: "availableExh",
        element: isAuthenticated() ? <AvailableExhs /> : <NavigateToLogin />,
      },
      {
        path: "employees",
        element: isAuthenticated() ? <Employee /> : <NavigateToLogin />,
      },
      {
        path: "sections",
        element: isAuthenticated() ? <AppSections /> : <NavigateToLogin />,
      },
      {
        path: "requests",
        element: isAuthenticated() ? <ExhRequests /> : <NavigateToLogin />,
      },
      {
        path: "newExh",
        element:
          isAuthenticated() && isOrganizer() ? <NewExh /> : <NavigateToLogin />,
      },
      {
        path: "ExhSearch",
        element:
          isAuthenticated() &&
          (isEmployee() || isCompany() || isOrganizer()) ? (
            <ExhSearch />
          ) : (
            <NavigateToLogin />
          ),
      },
      {
        path: "CompSearch",
        element:
          isAuthenticated() && isEmployeeUser() ? (
            <SearchComp />
          ) : (
            <NavigateToLogin />
          ),
      },
      {
        path: "VisSearch",
        element:
          isAuthenticated() && isEmployeeUser() ? (
            <VisSearch />
          ) : (
            <NavigateToLogin />
          ),
      },
    ],
  },
]);
export default router;
