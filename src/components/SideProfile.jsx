import { useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../context/myContext";

const SideProfile = () => {
  const { userSignOut, userData, userDataLoading } = useContext(MyContext);

  return (
    <div className="ml-10 mt-14 dark:bg-slate-800  p-4 dark:border-none border rounded-lg shadow-sm hover:shadow-md transition duration-100">
      <div className="flex items-center justify-between">
        {userDataLoading ? (
          <svg
            class="w-16 h-16 text-gray-200 dark:text-gray-700 animate-pulse"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
        ) : (
          <Link to={userData.user_name}>
            <img
              src={userData?.profilePic}
              alt="profile pic"
              className="rounded-full border p-[1px] w-16 h-16 hover:border-gray-400 dark:hover:border-slate-600 dark:border-slate-700 transition duration-200" // Reduced padding and added hover effect
            />
          </Link>
        )}

        <div className="flex-1 ml-4">
          <Link to={userData.user_name}>
            <h2 className="font-bold hover:text-gray-800 dark:hover:text-gray-400 transition duration-200">
              {userData.user_name}
            </h2>{" "}
          </Link>
          <h3 className="text-sm text-gray-500 dark:text-gray-300">
            {userData.name}
          </h3>{" "}
          {/* Darkened text */}
        </div>

        <button
          onClick={userSignOut}
          className="text-sm font-semibold text-indigo-400 hover:text-indigo-500  transition duration-200 p-1 rounded "
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};
export default SideProfile;
