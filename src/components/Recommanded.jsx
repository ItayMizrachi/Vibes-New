import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../context/myContext";
import { URL, doApiGet } from "../services/apiService";

const Recommanded = () => {
  const [suggestions, setSuggestions] = useState([]);
  const { userData, followUser, followFlag } = useContext(MyContext);

  useEffect(() => {
    if (userData._id) {
      doApiRandom5();
    }
  }, [followFlag, userData]);

  const doApiRandom5 = async () => {
    console.log(userData);
    console.log(userData.followings);
    let url;
    try {
      if (userData && userData.followings.length === 0) {
        url = URL + "/users/random4";
      } else {
        url = URL + "/users/random5";
      }
      console.log(url);
      const data = await doApiGet(url);
      setSuggestions(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="mt-4 ml-10 min-w-[400px]">
      <div className="flex justify-between mb-5">
        <h3 className="text-lg font-semibold text-gray-600">
          Suggestions For You
        </h3>
        {/* If you want to use the See All button later, you can uncomment it */}
        {/* <button className="text-sm font-semibold hover:text-gray-800 transition duration-200">See All</button> */}
      </div>

      {suggestions.map((profile) => (
        <div
          key={profile._id + Math.random()}
          className="flex items-center justify-between p-4  border-b border-gray-200 hover:bg-gray-50 transition duration-100" // Added padding and hover effect
        >
          <div className="w-10 h-10">
            <Link to={"/" + profile.user_name}>
              <img
                src={profile?.profilePic}
                alt="profilepic"
                className="object-cover w-full h-full rounded-full border p-[1px] hover:border-gray-400 transition duration-200" // Reduced padding and added hover effect
              />{" "}
            </Link>
          </div>

          <div className="flex-1 ml-4">
            <Link
              to={"/" + profile.user_name}
              className="text-base font-medium hover:text-gray-800 transition duration-200" // Increased font size and added hover effect
            >
              {profile.user_name}
            </Link>
            <p className="text-sm text-gray-500">{profile.name}</p>{" "}
            {/* Darkened text */}
            <p className="text-xs text-gray-400 truncate">
              {profile.desc}
            </p>{" "}
            {/* Utilize truncate for ellipsis rather than manual substring */}
          </div>

          <button
            onClick={() => followUser(profile?._id)}
            className="text-sm font-semibold text-indigo-400 hover:text-indigo-500  p-1 rounded transition duration-200"
          >
            {(profile?.followers || []).find((follower_id) => {
              return follower_id === userData._id;
            })
              ? "Unfollow"
              : "Follow"}
          </button>
        </div>
      ))}
    </div>
  );
};
export default Recommanded;
