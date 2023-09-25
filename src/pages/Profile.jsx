import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Post from "../components/post/Post";
import EditProfilePic from "../components/profile/EditProfilePic";
import EditRegUser from "../components/profile/EditRegUser";
import FollowersList from "../components/profile/FollowersList";
import Gallery from "../components/profile/Gallery";
import UserNotFound from "../components/profile/UserNotFound";
import { MyContext } from "../context/myContext";
import { URL, doApiGet } from "../services/apiService";
import LoadingGallery from "../components/profile/LoadingGallery";

const Profile = () => {
  const { userData, followUser, followFlag } = useContext(MyContext);
  const [postsInfo, setPostsInfo] = useState([]);
  const [savedPostsInfo, setSavedPostsInfo] = useState([]);
  const [likedPostsInfo, setLikedPostsInfo] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const { user_name } = useParams(); // Get the user_name from the URL parameter
  const [showGallery, setShowGallery] = useState(true);
  const [showUserPosts, setShowUserPosts] = useState(false);
  const [showUserSaves, setShowUserSaves] = useState(false);
  const [showUserLikes, setShowUserLikes] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const [isPop, setIsPop] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const nav = useNavigate(); // Get the navigation function from react-router-dom
  const [loading, setIsLoading] = useState(false);
  const [loadingUserInfo, setLoadingUserInfo] = useState(false);

  const handleSendMessage = (userId) => {
    // Navigate to the chat page with the selected user's ID
    nav(`/chat/${userId}`);
  };

  const show = (type) => {
    if (type === "userPosts") {
      setShowUserPosts(true);
      setShowUserLikes(false);
      setShowGallery(false);
      setShowUserSaves(false);
    } else if (type === "gallery") {
      setShowGallery(true);
      setShowUserLikes(false);
      setShowUserPosts(false);
      setShowUserSaves(false);
    } else if (type === "saves") {
      setShowUserSaves(true);
      setShowGallery(false);
      setShowUserPosts(false);
      setShowUserLikes(false);
    } else if (type === "likedposts") {
      setShowUserLikes(true);
      setShowGallery(false);
      setShowUserPosts(false);
      setShowUserSaves(false);
    }
  };

  const doApiUserPosts = async (user_name) => {
    try {
      setIsLoading(true);
      const url = URL + "/userPosts/userInfo/" + user_name;
      const data = await doApiGet(url);
      setPostsInfo(data);
      setIsLoading(false);
      // console.log(data);
    } catch (err) {
      console.log(err);
      setUserNotFound(true);
      setIsLoading(false);
    }
  };

  const doApiSavedUserPosts = async (user_name) => {
    try {
      const url = URL + "/userPosts/savedposts/" + user_name;
      const data = await doApiGet(url);
      setSavedPostsInfo(data);
      // console.log(data);
    } catch (err) {
      console.log(err);
      setUserNotFound(true);
    }
  };

  const doApiLikedUserPosts = async (user_name) => {
    try {
      const url = URL + "/userPosts/likedposts/" + user_name;
      const data = await doApiGet(url);
      setLikedPostsInfo(data);
      // console.log(data);
    } catch (err) {
      console.log(err);
      setUserNotFound(true);
    }
  };

  // const [Intersector, data, setData] = useLazyLoading(
  //   { initPage: 0, distance: "50px", targetPercent: 0.5 },
  //   async (page) => {
  //     try {
  //       // const url = URL + `/userPosts/userInfo/Apple?page=${page}}`;
  //       // const url = "http://localhost:3002/userPosts/userInfo/Apple?page=1";
  //       const url = `/userPosts/allposts?page=${page}`;
  //       const d = await doApiGet(url);
  //       setData(d);
  //       console.log(data);
  //       console.log("noy");
  //     } catch (err) {
  //       console.log(err);
  //       setUserNotFound(true);
  //       console.log("blabla");
  //     }
  //   }
  // );

  // useEffect(() => {
  //   setPostsInfo(data);
  // }, [data]);

  const doApiUserInfo = async (user_name) => {
    try {
      setLoadingUserInfo(true);
      const url = URL + "/users/userInfo/pop/" + user_name;
      const data = await doApiGet(url);
      setUserInfo(data);
      setLoadingUserInfo(false);
    } catch (err) {
      console.log(err);
      setUserNotFound(true);
      setLoadingUserInfo(false);
    }
  };

  useEffect(() => {
    if (user_name) {
      doApiUserPosts(user_name);
      doApiUserInfo(user_name);
      doApiSavedUserPosts(user_name);
      doApiLikedUserPosts(user_name);
    }
  }, [user_name, followFlag]);

  const closeWindow = () => {
    setIsPop(false);
  };
  const openWindow = () => {
    setIsPop(true);
  };

  useEffect(() => {
    if (user_name) {
      show("gallery");
      window.scrollTo(0, 0);
    }
  }, [user_name]);

  return (
    <div className="sm:p-10 mx-0 lg:max-w-6xl md:mx-5 xl:mx-auto p-1 min-h-screen">
      {/* Profile Info */}
      {showFollowers && (
        <FollowersList
          setShowFollowers={setShowFollowers}
          follow={userInfo.followers}
          title={"Followers"}
        />
      )}
      {showFollowing && (
        <FollowersList
          setShowFollowing={setShowFollowing}
          follow={userInfo.followings}
          title={"Following"}
        />
      )}
      {showEditUser && <EditRegUser setShowEditUser={setShowEditUser} />}
      {isPop && <EditProfilePic onClose={closeWindow} />}
      {userInfo?.user_name ? (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4 p-3 pt-10">
            <div className="justify-center avatar md:col-span-1 relative ">
              <div className="justify-center avatar md:col-span-1 hover:opacity-90 relative w-36 group h-36 mx-auto md:mx-0">
                {loadingUserInfo ? (
                  <svg
                    class="w-full h-full text-gray-200 dark:text-gray-700 animate-pulse"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                  </svg>
                ) : (
                  <img
                    className={`rounded-full w-full h-full opacity-100 transition-opacity duration-300 ${
                      userInfo._id === userData._id
                        ? "cursor-pointer hover:text-black backdrop-filter bg-black "
                        : ""
                    }`}
                    src={userInfo.profilePic}
                    alt="profile pic"
                  />
                )}

                {userInfo.profilePic === userData.profilePic && (
                  <div
                    onClick={openWindow}
                    className="absolute cursor-pointer inset-0 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300 ease-out"
                  >
                    <span className="text-white font-semibold relative">
                      Change Profile Pic
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="md:col-span-3 space-y-4">
              {/* User Info and Action Buttons */}
              <div className="flex items-center justify-between space-x-4">
                <span className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                  {userInfo.user_name}
                </span>

                <div className="flex space-x-2">
                  {userData._id !== userInfo._id ? (
                    <>
                      <button
                        onClick={() => followUser(userInfo._id)}
                        className="px-4 py-2 text-white font-semibold active:scale-95 transform bg-indigo-500 rounded hover:bg-indigo-600 transition duration-200"
                      >
                        {userInfo.followers.some(
                          (follower) => follower._id === userData._id
                        )
                          ? "Unfollow"
                          : "Follow"}
                      </button>
                      <button
                        onClick={() => handleSendMessage(userInfo._id)}
                        className="px-4 py-2 text-white font-semibold active:scale-95 transform bg-indigo-500 rounded hover:bg-indigo-600 transition duration-200"
                      >
                        Message
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setShowEditUser(true)}
                        className="px-4 py-2 text-white font-semibold active:scale-95 transform bg-indigo-500 rounded hover:bg-indigo-600 transition duration-200"
                      >
                        Edit User
                      </button>
                      {userData?.role == "admin" && (
                        <Link
                          to={"/admin/users"}
                          className="px-4 py-2 text-white font-semibold active:scale-95 transform bg-indigo-500 rounded hover:bg-indigo-600 transition duration-200"
                        >
                          Admin
                        </Link>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-4 md:space-y-6">
                {/* User's Metrics: Posts, Followers, Following */}
                <div className="flex justify-start space-x-6">
                  <div className="group flex flex-col items-center">
                    <span className="text-xl font-semibold">
                      {postsInfo.length}
                    </span>
                    <span className=" hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-200">
                      Posts
                    </span>
                  </div>
                  <div
                    className="group flex flex-col items-center cursor-pointer"
                    onClick={() => setShowFollowers(true)}
                  >
                    <span className="text-xl font-semibold">
                      {userInfo.followers?.length}
                    </span>
                    <span className=" hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-200">
                      Followers
                    </span>
                  </div>

                  <div
                    className="group flex flex-col items-center cursor-pointer"
                    onClick={() => setShowFollowing(true)}
                  >
                    <span className="text-xl font-semibold">
                      {userInfo.followings?.length}
                    </span>
                    <span className=" hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-200">
                      Following
                    </span>
                  </div>
                </div>

                {/* User's Name and Description */}
                <div>
                  <h2 className="text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-200">
                    {userInfo.name}
                  </h2>
                  <p className="text-base text-indigo-400 mt-1">
                    {userInfo.desc}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <hr className="my-6 border-t dark:border-slate-700 border-gray-200" />

          {/* Tabs for Posts, Liked, Saved, Gallery */}
          <div className="flex justify-center gap-4 pb-2">
            <button
              onClick={() => show("userPosts")}
              className="py-2 px-4 text-sm font-semibold text-gray-400 border-b-2 border-transparent hover:border-gray-200 focus:border-gray-300"
            >
              Posts
            </button>

            {userData._id === userInfo._id && (
              <>
                <button
                  onClick={() => show("likedposts")}
                  className="py-2 px-4 text-sm font-semibold text-gray-400 border-b-2 border-transparent hover:border-gray-200 focus:border-gray-300"
                >
                  Liked
                </button>
                <button
                  onClick={() => show("saves")}
                  className="py-2 px-4 text-sm font-semibold text-gray-400 border-b-2 border-transparent hover:border-gray-200 focus:border-gray-300"
                >
                  Saved
                </button>
              </>
            )}
            <button
              onClick={() => show("gallery")}
              className="py-2 px-4 text-sm font-semibold text-gray-400 border-b-2 border-transparent hover:border-gray-200 focus:border-gray-300"
            >
              Gallery
            </button>
          </div>
          {loading && <LoadingGallery />}

          {/* Gallery */}
          {!loading &&
            showGallery &&
            (postsInfo.length === 0 ? (
              <h1 className="text-center mt-5 font-semibold">
                no posts posted yet 😕
              </h1>
            ) : (
              <Gallery postsInfo={postsInfo} />
            ))}

          {showUserPosts && (
            <>
              <div className="max-w-[700px]  mx-auto">
                {postsInfo.map((post) => (
                  <Post
                    likes={post.likes}
                    likesLength={post.likes.length}
                    key={post._id + Math.random()}
                    _id={post._id}
                    user_name={post.user?.user_name}
                    profilePic={post.user?.profilePic}
                    img_url={post.img_url}
                    description={post.description}
                    date_created={post.date_created}
                    user_id={post.user._id}
                  />
                ))}
                {postsInfo.length == 0 && (
                  <h1 className="text-center mt-5 font-semibold">
                    no posts posted yet 😕{" "}
                  </h1>
                )}
              </div>
              {/* <Intersector /> */}
            </>
          )}
          {showUserSaves && (
            <>
              <div className="max-w-[700px]  mx-auto">
                {savedPostsInfo.map((post) => (
                  <Post
                    likes={post.likes}
                    likesLength={post.likes?.length}
                    key={post._id + Math.random()}
                    _id={post._id}
                    user_name={post.user?.user_name}
                    profilePic={post.user?.profilePic}
                    img_url={post.img_url}
                    description={post.description}
                    date_created={post.date_created}
                    user_id={post.user._id}
                  />
                ))}
                {savedPostsInfo.length == 0 && (
                  <h1 className="text-center mt-5 font-semibold">
                    no posts saved yet
                  </h1>
                )}
              </div>
            </>
          )}

          {showUserLikes && (
            <>
              <div className="max-w-[700px]  mx-auto">
                {likedPostsInfo.map((post) => (
                  <Post
                    likes={post.likes}
                    likesLength={post.likes?.length}
                    key={post._id + Math.random()}
                    _id={post._id}
                    user_name={post.user?.user_name}
                    profilePic={post.user?.profilePic}
                    img_url={post.img_url}
                    description={post.description}
                    date_created={post.date_created}
                    user_id={post.user._id}
                  />
                ))}
                {likedPostsInfo.length == 0 && (
                  <h1 className="text-center mt-5 font-semibold">
                    no posts liked yet
                  </h1>
                )}
              </div>
            </>
          )}
        </>
      ) : (
        userNotFound && <UserNotFound />
      )}
    </div>
  );
};

export default Profile;
