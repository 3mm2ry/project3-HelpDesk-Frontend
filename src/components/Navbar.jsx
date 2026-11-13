import { Link } from "react-router";

import employeeImg from "../assets/employee.png";
import itStaffImg from "../assets/it-staff.png";
import adminImg from "../assets/admin.png";

function Navbar({ user, handleLogout }) {
  let roleImage = employeeImg;

  if (user && user.role === "IT-Staff") {
    roleImage = itStaffImg;
  }

  if (user && user.role === "Admin") {
    roleImage = adminImg;
  }

  return (
    <nav>
      {user ? (
        <>
          <Link to="/dashboard">Dashboard</Link>

          <Link to="/tickets">Tickets</Link>

          <Link to="/assets">Assets</Link>

          <Link to="/locations">Locations</Link>

          {user.role === "IT-Staff" || user.role === "Admin" ? (
            <Link to="/asset-requests">Asset Requests</Link>
          ) : null}

          {user.role === "Admin" ? (
            <>
              <Link to="/users">Users</Link>

              <Link to="/departments">Departments</Link>
            </>
          ) : null}

          <Link to="/profile">
            <img src={roleImage} alt={user.role} width="35" />
          </Link>

          <button onClick={handleLogout}>Sign Out</button>
        </>
      ) : (
        <>
          <Link to="/">Home</Link>

          <Link to="/sign-up">Sign Up</Link>

          <Link to="/sign-in">Sign In</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
