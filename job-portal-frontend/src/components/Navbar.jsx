import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <Link to="/" className="font-bold">JobPortal</Link>

      <div className="space-x-4">
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {user?.role === "EMPLOYER" && (
          <>
            <Link to="/create-job">Post Job</Link>
            <Link to="/my-jobs">My Jobs</Link>
            <Link to="/employer-applications">Applications</Link>
            <Link to="/create-company"> Create Company</Link>
          </>
        )}

        {user?.role === "CANDIDATE" && (
          <>
            <Link to="/jobs">Browse Jobs</Link>
            <Link to="/my-applications">My Applications</Link>
          </>
        )}

        {user && (
          <button onClick={logout} className="text-red-400">Logout</button>
        )}
      </div>
    </nav>
  );
}
