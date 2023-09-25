import { useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../context/myContext"; 

const SideProfile = () => {             
  const { userSignOut, userData } = useContext(MyContext);   

  return (
    <div className="ml-10 mt-14 dark:bg-slate-800  p-4 dark:border-none border rounded-lg shadow-sm hover:shadow-md transition duration-100">
      <div className="flex items-center justify-between">
        <Link to={userData.user_name}>
          <img
            src={userData?.profilePic}
            alt="profile pic"
            className="rounded-full border p-[1px] w-16 h-16 hover:border-gray-400 dark:hover:border-slate-600 dark:border-slate-700 transition duration-200" // Reduced padding and added hover effect 
          />  
        </Link>   

        <div className="flex-1 ml-4"> 
          <Link to={userData.user_name}>
            <h2 className="font-bold hover:text-gray-800 dark:hover:text-gray-400 transition duration-200">
              {userData.user_name}
            </h2>{" "}
          </Link>
          <h3 className="text-sm text-gray-500 dark:text-gray-300">{userData.name}</h3>{" "}
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
