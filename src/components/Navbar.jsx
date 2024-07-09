import { useContext } from "react";
import { AuthContext } from "../context/AuthContextWrapper";
import { NavLink } from "react-router-dom";

function Navbar() {
  const { user, isLoggedIn, disconnect } = useContext(AuthContext);

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">HomePage</NavLink>
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
                <button onClick={disconnect}>Logout</button>
              </li>
              <li>
                <p>Welcome back {user.username}</p>
              </li>
              <li>
                <NavLink to={"/create"}>Create post</NavLink>
              </li>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;