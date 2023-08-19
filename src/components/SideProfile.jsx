import { useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../context/myContext";

const SideProfile = () => {
  const { userSignOut, userData } = useContext(MyContext);
  
  return (
    <div className="flex items-center justify-between ml-10 mt-14">
      <Link to={userData.user_name}>
        <img
          src={userData?.profilePic}
          alt="profile pic"
          className="rounded-full border p-[2px] w-16 h-16"
        />
      </Link>

      <div className="flex-1 mx-4">
        <Link to={userData.user_name}>
          <h2 className="font-bold">{userData.user_name}</h2>
        </Link>
        <h3 className="text-sm text-gray-400">{userData.name}</h3>
      </div>

      <button
        onClick={userSignOut}
        className="text-sm font-semibold text-blue-400"
      >
        Sign Out
      </button>
    </div>
  );
};

export default SideProfile;
