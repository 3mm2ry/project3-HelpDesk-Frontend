
import { useState } from "react";
import { Navigate, Route, Routes } from "react-router";

import Navbar from "./components/Navbar";

import SignupPage from "./pages/SignupPage";
import Homepage from "./pages/Homepage";
import SignInPage from "./pages/SigninPage";
import Dashboard from "./pages/Dashboard";

import TicketList from "./pages/tickets/TicketList";
import CreateTicket from "./pages/tickets/CreateTicket";
import TicketDetails from "./pages/tickets/TicketDetails";
import EditTicket from "./pages/tickets/EditTicket";
import Comments from "./pages/tickets/components/Comments";

import AssetList from "./pages/assets/AssetList";
import CreateAsset from "./pages/assets/CreateAsset";
import AssetDetails from "./pages/assets/AssetDetails";
import EditAsset from "./pages/assets/EditAsset";
import AssetRequests from "./pages/assets/AssetRequests";

import UserList from "./pages/users/UserList";
import UserDetails from "./pages/users/UserDetails";
import EditUser from "./pages/users/EditUser";

import DepartmentList from "./pages/departments/DepartmentList";
import DepartmentDetails from "./pages/departments/DepartmentDetails";
import DepartmentForm from "./pages/departments/DepartmentForm";

import LocationList from "./pages/locations/LocationList";
import LocationDetails from "./pages/locations/LocationDetails";
import LocationForm from "./pages/locations/LocationForm";

import Profile from "./pages/Profile";

import { logout } from "./services/authService";

function App() {
  function getUserFromToken() {
    const token = localStorage.getItem("token");

    if (!token) return null;

    return JSON.parse(atob(token.split(".")[1]));
  }

  const [user, setUser] = useState(getUserFromToken());

  function handleLogout() {
    logout();
    setUser(null);
  }

  return (
    <div>
      <Navbar user={user} handleLogout={handleLogout} />

      <Routes>
        {/* Template Routes */}
        <Route path="/" element={<Homepage />} />

        <Route path="/sign-up" element={<SignupPage />} />

        <Route
          path="/sign-in"
          element={<SignInPage setUser={setUser} />}
        />

        <Route
          path="/dashboard"
          element={
            user ? <Dashboard user={user} /> : <Navigate to="/sign-in" />
          }
        />

        {/* Tickets */}
        <Route path="/tickets" element={<TicketList />} />

        <Route path="/tickets/new" element={<CreateTicket />} />

        <Route
          path="/tickets/:ticketId"
          element={<TicketDetails />}
        />

        <Route
          path="/tickets/:ticketId/edit"
          element={<EditTicket />}
        />

        <Route
          path="/tickets/:ticketId/comments"
          element={<Comments />}
        />

        {/* Assets */}
        <Route path="/assets" element={<AssetList />} />

        <Route path="/assets/new" element={<CreateAsset />} />

        <Route
          path="/assets/:assetId"
          element={<AssetDetails />}
        />

        <Route
          path="/assets/:assetId/edit"
          element={<EditAsset />}
        />

        <Route
          path="/asset-requests"
          element={<AssetRequests />}
        />

        {/* Users */}
        <Route path="/users" element={<UserList />} />

        <Route
          path="/users/:userId"
          element={<UserDetails />}
        />

        <Route
          path="/users/:userId/edit"
          element={<EditUser />}
        />

        {/* Departments */}
        <Route
          path="/departments"
          element={<DepartmentList />}
        />

        <Route
          path="/departments/new"
          element={<DepartmentForm />}
        />

        <Route
          path="/departments/:departmentId"
          element={<DepartmentDetails />}
        />

        <Route
          path="/departments/:departmentId/edit"
          element={<DepartmentForm />}
        />

        {/* Locations */}
        <Route
          path="/locations"
          element={<LocationList />}
        />

        <Route
          path="/locations/new"
          element={<LocationForm />}
        />

        <Route
          path="/locations/:locationId"
          element={<LocationDetails />}
        />

        <Route
          path="/locations/:locationId/edit"
          element={<LocationForm />}
        />

        {/* Profile */}
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
