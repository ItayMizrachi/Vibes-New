import { ArrowRightIcon } from "@heroicons/react/solid";
import { animated, useSpring } from "@react-spring/web";
import axios from "axios";
import { useLazyLoading } from "mg-js";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../context/myContext";
import { URL } from "../services/apiService";

const Noftlications = ({
  setShowNoftlications,
  setIsRead,
  showNoftlications,
}) => {
  const { userData, followUser, followFlag } = useContext(MyContext);
  const [flag, setFlag] = useState(false);
  const [isOpen, setIsOpen] = useState(showNoftlications);

  useEffect(() => {
    setIsOpen(showNoftlications);
  }, [showNoftlications]);

  const animation = useSpring({
    from: { transform: "translateX(100%)" },
    to: { transform: isOpen ? "translateX(0)" : "translateX(100%)" },
    config: { tension: 280, friction: 60 }
});

  const [Intersector, data, setData] = useLazyLoading(
    {
      initPage: 1,
      distance: "50px",
      targetPercent: 0.5,
      uuidKeeper: "notifications",
    },
    async (page) => {
      try {
        const url = URL + "/notifications/" + userData._id + "?page=" + page;
        const resp = await fetch(url);
        const obj = await resp.json();
        setData(obj);
        const read = await axios.put(
          URL + "/notifications/mark-as-read/" + userData._id
        );
        setIsRead(read);
        setFlag(true);
      } catch (error) {
        alert(error);
      }
    }
  );

  const close = () => {
    setIsOpen(false);
    setTimeout(() => {
      setShowNoftlications(false);
    }, 300); // delay for 300ms or adjust based on the duration you think is suitable.
  };

  const [followingState, setFollowingState] = useState({});

  const toggleFollow = (senderId) => {
    followUser(senderId);  // Call your API function to follow/unfollow

    setFollowingState(prevState => ({
      ...prevState,
      [senderId]: !prevState[senderId]
    }));
  };

  useEffect(() => {
    // Initialize the followingState based on the data once it's loaded
    const newFollowingState = {};
    data.forEach(item => {
      newFollowingState[item.sender._id] = item.sender.followers.some(follower_id => follower_id === userData._id);
    });
    setFollowingState(newFollowingState);
  }, [data, userData]);
  
  
  return (
    <animated.div style={animation} className="flex fixed right-0 top-0 z-40 ">
      {/* sidebar */}
      <div>
        <div className="max-2-xs h-[100vh] border-l-2 dark:border-slate-600 overflow-x-hidden min-w-[20rem] bg-white dark:bg-slate-800 custom-scrollbar">
          <div className="flex flex-col h-[100vh] pt-0 p-2 ">
            {/* Title */}
            <div className="bg-white dark:bg-slate-800 p-2 fixed w-full pr-3 top-0 z-40">
              <div className="bg-white dark:bg-slate-800">
                <div
                  onClick={close}
                  className="border-b-2 border-gray-200 dark:border-slate-600 chatRow flex justify-between dark:bg-slate-800"
                >
                  <h3 className="text-lg font-semibold">Notifications</h3>
                  <ArrowRightIcon className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="mt-16">
              {data.length === 0 && flag ? (
                <div className="justify-center chatRow">
                  <div className="flex-1 truncate md:inline-flex flex-col">
                    <h2 className="text-lg">
                      You have no notifications yet ! :)
                    </h2>
                  </div>
                </div>
              ) : (
                data.map((item, index) => (
                  <div key={index} className="justify-center chatRow">
                    <div className="w-10 h-10">
                      <Link
                        onClick={() => setShowNoftlications(false)}
                        to={item.sender.user_name}
                      >
                        <img
                          src={item.sender.profilePic}
                          alt="profile pic"
                          className="object-cover w-full h-full rounded-full cursor-pointer"
                        />
                      </Link>
                    </div>
                    <div className="flex-1 truncate md:inline-flex flex-col">
                      <Link
                        onClick={() => setShowNoftlications(false)}
                        to={item.sender.user_name}
                      >
                        <h3 className="font-semibold hover:underline">
                          {item.sender.user_name}
                        </h3>
                      </Link>

                      {item.eventType === "follow" && (
                        <div>
                          <p>Started following you!</p>
                          <button
                            className="p-2 my-2 text-white font-semibold  bg-indigo-500 rounded-md transition duration-300 hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                            onClick={() => toggleFollow(item.sender._id)}
                          >
                            {followingState[item.sender._id] ? "Unfollow" : "Follow Back"}
                          </button>
                        </div>
                      )}
                      {item.eventType === "like" && (
                        <p>
                          Liked your{" "}
                          <Link
                            onClick={() => setShowNoftlications(false)}
                            to={"singlepost/" + item.postId?._id}
                          >
                            <span className="hover:underline">post!</span>
                          </Link>
                        </p>
                      )}
                      {item.eventType === "comment" && (
                        <p>
                          Commented:{" "}
                          {item.commentId?.text.length > 7
                            ? item.commentId?.text.substring(0, 7) + ".."
                            : item.commentId?.text}
                        </p>
                      )}
                      <p className="text-gray-400">
                        {moment(item.date_created).fromNow()}
                      </p>
                    </div>
                    {item.eventType === "comment" && (
                      <Link
                        onClick={() => setShowNoftlications(false)}
                        to={"singlepost/" + item.postId?._id}
                      >
                        <div>
                          <img
                            className="w-10 h-10 rounded-md"
                            src={item.postId?.img_url}
                            alt="post"
                          />
                        </div>
                      </Link>
                    )}
                    {item.eventType === "like" && (
                      <Link
                        onClick={() => setShowNoftlications(false)}
                        to={"singlepost/" + item.postId?._id}
                      >
                        <div>
                          <img
                            className="w-10 h-10 rounded-md"
                            src={item.postId?.img_url}
                            alt="post"
                          />
                        </div>
                      </Link>
                    )}
                  </div>
                ))
              )}
              <Intersector />
            </div>
          </div>
        </div>
      </div>
    </animated.div>
  );
};

export default Noftlications;
