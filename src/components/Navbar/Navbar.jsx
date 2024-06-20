import { useContext } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, handleLogout } = useContext(AuthContext);

  console.log(user);

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" className="logo">
          NextBooking
        </Link>
        {user ? (
          <div className="flex justify-center items-center gap-4">
            <span className="text-lg"> {user.username}</span>
            <button
              onClick={handleLogout}
              className="btn border border-slate-200 py-1 px-4 "
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex justify-center items-center gap-4">
            <Link to="/register">
              <button className="btn border border-slate-200 py-1 px-4  ">
                Register
              </button>
            </Link>
            <Link to="/login">
              <button className="btn border border-slate-200 py-1 px-4 ">
                Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
