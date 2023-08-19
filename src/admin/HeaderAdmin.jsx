import { LogoutIcon } from "@heroicons/react/solid";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TOKEN_KEY } from "../services/apiService";

const HeaderAdmin = () => {
  const nav = useNavigate();

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
    <header className="sticky top-0 z-50 px-6 bg-white border-b shadow-sm p-10 sm:p-10 md:p-10 lg:p-2">
    <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
      {/* left */}
      <div className="relative hidden w-24 h-24 lg:inline-grid">
        <img
          src="/images/vibes-logo.png"
          className="object-contain w-full h-full"
          alt="logo"
        />
      </div>
      <div className="relative flex-shrink-0 w-10 lg:hidden">
        <img
          src="/images/vibes-logo-responsive.png"
          className="object-contain w-full h-full"
          alt="responsive logo"
        />
      </div>

      <nav className="flex justify-start items-center flex-grow">
        <div className="text-xl font-bold">- Admin</div>
      </nav>

      <nav className="flex justify-end items-center flex-grow">
        {localStorage[TOKEN_KEY] && (
          <ul className="flex space-x-4">
            <li>
              <Link className="hover:underline font-semibold text-lg" to="/admin/users">
                Users List
              </Link>
            </li>
            <li>
              <Link className="hover:underline font-semibold text-lg" to="/admin/groups">
                Groups List
              </Link>
            </li>
            <li>
              <Link className="hover:underline font-semibold text-lg" to="/admin/posts">
                Posts List
              </Link>
            </li>
          </ul>
        )}
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
