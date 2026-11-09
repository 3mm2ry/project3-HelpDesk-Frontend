
import { Link } from "react-router";

function Navbar({ user, handleLogout }) {
  return (
    <nav>
      <Link to="/">Home</Link>

      {user ? (
        <>
          <Link to="/dashboard">Dashboard</Link>

          <Link to="/tickets">Tickets</Link>

          <Link to="/assets">Assets</Link>

          <Link to="/asset-requests">Asset Requests</Link>

          <Link to="/users">Users</Link>

          <Link to="/departments">Departments</Link>

          <Link to="/locations">Locations</Link>

          <Link to="/profile">Profile</Link>

          <button onClick={handleLogout}>Sign Out</button>
        </>
      ) : (
        <>
          <Link to="/sign-up">Sign Up</Link>

          <Link to="/sign-in">Sign In</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
