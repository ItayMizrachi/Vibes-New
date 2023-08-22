import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../context/myContext";
import { URL, doApiGet } from "../services/apiService";

const Recommanded = () => {
  const [suggestions, setSuggestions] = useState([]);
  const { userData, followUser, followFlag } = useContext(MyContext);

  useEffect(() => {
    doApiRandom5();
  }, [followFlag, userData]);

  const doApiRandom5 = async () => {
    console.log(userData)
    console.log(userData.followings)
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
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mt-4 ml-10 min-w-[300px]">
      <div className="flex justify-between mb-5 text-sm">
        <h3 className="text-sm font-bold text-gray-400">Suggestions For You</h3>
        {/* <button className="font-semibold text-gray-600">See All</button> */}
      </div>

      {suggestions.map((profile) => (
        <div
          key={profile._id + Math.random()}
          className="flex items-center justify-between mt-3"
        >
          <Link to={"/" + profile.user_name}>
            <img
              src={profile?.profilePic}
              alt="profilepic"
              className="w-10 h-10 rounded-full border p-[2px]"
            />{" "}
          </Link>

          <div className="flex-1 ml-4">
            <Link
              to={"/" + profile.user_name}
              className="text-sm font-semibold"
            >
              {profile.user_name}
            </Link>
            <p className="text-gray-400 text-sm">{profile.name}</p>
            <p className="text-xs text-gray-400 whitespace-normal">
              {" "}
              {profile?.desc?.length > 27
                ? profile.desc.substring(0, 27) + ".."
                : profile.desc}
            </p>
          </div>

          <button
            onClick={() => followUser(profile?._id)}
            className="text-sm font-semibold text-blue-400"
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