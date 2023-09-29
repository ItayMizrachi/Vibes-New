import { HomeIcon, LogoutIcon } from "@heroicons/react/solid";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TOKEN_KEY } from "../services/apiService";
import { MyContext } from "../context/myContext";

const HeaderAdmin = () => {
  const nav = useNavigate();
  const { userData, darkMode } = useContext(MyContext);

  const onLogOut = () => {
    if (
      window.confirm("Are you sure you want to log out from admin session?")
    ) {
      localStorage.removeItem(TOKEN_KEY);
      nav("/admin");
      toast.info("You logged out, see ya");
    }
  };

  return (
    <header className="sticky top-0 z-10 md:px-6 p-5 lg:p-0  border-b shadow-s px-3 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
        {/* left */}
        <div
          className={`relative w-24 h-24 cursor-pointer ${
            darkMode ? "hidden" : ""
          }`}
        >
          <Link to="/">
            <img
              src="/images/vibes-logo.png"
              className="object-contain w-full h-full "
              alt="logo"
            />
          </Link>
        </div>
     

        {/* Dark mode logo for large screens */}
        <div
          className={`relative w-24 h-24 cursor-pointer ${
            darkMode ? "" : "hidden"
          }`}
        >
          <Link to="/">
            <img
              src="/images/dark-logo.png"
              className="object-contain w-full h-full "
              alt="logo"
            />
          </Link>
        </div>
   
        <nav className="flex justify-start items-center flex-grow">
          <div className="text-xl font-bold">- Admin</div>
        </nav>

        <nav className="flex justify-end items-center flex-grow">
          {localStorage[TOKEN_KEY] && userData.role == "admin" && (
            <ul className="flex space-x-4">
              <li>
                <Link
                  className="hover:underline font-semibold text-lg"
                  to="/admin/users"
                >
                  Users List
                </Link>
              </li>
              <li>
                <Link
                  className="hover:underline font-semibold text-lg"
                  to="/admin/comments"
                >
                  Comments List
                </Link>
              </li>
              <li>
                <Link
                  className="hover:underline font-semibold text-lg"
                  to="/admin/posts"
                >
                  Posts List
                </Link>
              </li>
            </ul>
          )}
          <Link to={"/"}>
            <HomeIcon className="btn ml-4" />
          </Link>
          <div>
            {localStorage[TOKEN_KEY] && (
              <LogoutIcon onClick={onLogOut} className="btn ml-4" />
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default HeaderAdmin;
