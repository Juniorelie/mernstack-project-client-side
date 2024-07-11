import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContextWrapper";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.jpg";
// import service from "../service/api";

function Navbar() {
  const { user, isLoggedIn, disconnect } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="sticky top-0 z-50 container mx-auto flex justify-between px-4 bg-slate-800 text-[whitesmoke] items-center py-4">
      <Link to={"/"} className="flex items-center">
        <img src={logo} alt="Logo" className="w-10 h-10 mr-2" />
        <h1 className="text-3xl font-extrabold">MY MEMORIES</h1>
      </Link>
      <button className="md:hidden" onClick={toggleModal}>
        Menu
      </button>
      <nav className="hidden md:block">
        <ul className="flex gap-4 p-4">
          <li className="hover:text-[#5e17eb]   transition-all ease-in-out duration-200 font-semibold md:text-md lg:text-lg">
            <NavLink to="/">Home</NavLink>
          </li>
          {!isLoggedIn ? (
            <>
              <li className="hover:text-[#5e17eb]   transition-all ease-in-out duration-200 font-semibold md:text-md lg:text-lg">
                <NavLink to={"/signup"}>Sign up</NavLink>
              </li>
              <li className="hover:text-[#5e17eb]   transition-all ease-in-out duration-200 font-semibold md:text-md lg:text-lg">
                <NavLink to={"/login"}>Login</NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="hover:text-[#5e17eb]   transition-all ease-in-out duration-200 font-semibold md:text-md lg:text-lg">
                <Link to={`/profile/${user._id}`}>
                  Welcome <span className="underline">{user.username}</span>
                </Link>
              </li>
              <li className="hover:text-[#5e17eb]   transition-all ease-in-out duration-200 font-semibold md:text-md lg:text-lg">
                <NavLink to={"/create"}>Create post</NavLink>
              </li>
              <li className="hover:text-[#5e17eb]   transition-all ease-in-out duration-200 font-semibold md:text-md lg:text-lg">
                <button onClick={disconnect}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-slate-800 rounded-lg p-6 w-3/4 sm:w-1/2 md:w-1/3">
            <button className="absolute top-4 right-4" onClick={toggleModal}>
              Close
            </button>
            <nav>
              <ul className="flex flex-col gap-4 p-4">
                <li>
                  <NavLink to="/" onClick={toggleModal}>
                    Home
                  </NavLink>
                </li>
                {!isLoggedIn ? (
                  <>
                    <li>
                      <NavLink to={"/signup"} onClick={toggleModal}>
                        Sign up
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={"/login"} onClick={toggleModal}>
                        Login
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <button
                        onClick={() => {
                          disconnect();
                          toggleModal();
                        }}
                      >
                        Logout
                      </button>
                    </li>
                    <li>
                      <p>Welcome back {user.username}</p>
                    </li>
                    <li>
                      <NavLink to={"/create"} onClick={toggleModal}>
                        Create post
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
