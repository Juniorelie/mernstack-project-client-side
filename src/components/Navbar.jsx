import { useContext } from "react";
import { AuthContext } from "../context/AuthContextWrapper";
import { Link, NavLink } from "react-router-dom";
// import service from "../service/api";

function Navbar() {
  const { user, isLoggedIn, disconnect } = useContext(AuthContext);

  return (
    <div className="flex justify-between px-4">
      <Link to={"/"}><h1>My memories</h1></Link>
      <nav>
        <ul className="flex justify-between">
          <li>
            <NavLink to="/">Home</NavLink>
            {!isLoggedIn ? (
              <>
                <li>
                  <NavLink to={"/signup"}>Sign up</NavLink>
                </li>
                <li>
                  <NavLink to={"/login"}>Login</NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <p>Welcome back {user.username}</p>
                </li>
                <li>
                  <NavLink to={"/create"}>Create post</NavLink>
                </li>
                <li>
                  <button onClick={disconnect}>Logout</button>
                </li>
              </>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
