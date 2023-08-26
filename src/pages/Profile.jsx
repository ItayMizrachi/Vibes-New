import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Post from "../components/post/Post";
import EditProfilePic from "../components/profile/EditProfilePic";
import FollowersList from "../components/profile/FollowersList";
import Gallery from "../components/profile/Gallery";
import UserNotFound from "../components/profile/UserNotFound";
import { MyContext } from "../context/myContext";
import { URL, doApiGet } from "../services/apiService";

const Profile = () => {
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
  const { userData, followUser, followFlag } = useContext(MyContext);
  const [isPop, setIsPop] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  const nav = useNavigate(); // Get the navigation function from react-router-dom

  const handleSendMessage = (userId) => {
    // Navigate to the chat page with the selected user's ID
    nav(`/chat/${userId}`);
  };

  const show = (type) => {
    if (type === "userPosts") {
      setShowUserPosts(true);
      setShowUserLikes(false)
      setShowGallery(false);
      setShowUserSaves(false);
    } else if (type === "gallery") {
      setShowGallery(true);
      setShowUserLikes(false)
      setShowUserPosts(false);
      setShowUserSaves(false);
    } else if (type === "saves") {
      setShowUserSaves(true);
      setShowGallery(false);
      setShowUserPosts(false);
      setShowUserLikes(false)
    } else if (type === "likedposts") {
      setShowUserLikes(true)
      setShowGallery(false);
      setShowUserPosts(false);
      setShowUserSaves(false);
    }
  };

  const doApiUserPosts = async (user_name) => {
    try {
      const url = URL + "/userPosts/userInfo/" + user_name;
      const data = await doApiGet(url);
      setPostsInfo(data);
      console.log(data);

    } catch (err) {
      console.log(err);
      setUserNotFound(true);
    }
  };

  const doApiSavedUserPosts = async (user_name) => {
    try {
      const url = URL + "/userPosts/savedposts/" + user_name;
      const data = await doApiGet(url);
      setSavedPostsInfo(data);
      console.log(data);
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
      console.log(data);
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
      const url = URL + "/users/userInfo/pop/" + user_name;
      const data = await doApiGet(url);
      setUserInfo(data);
    } catch (err) {
      console.log(err);
      setUserNotFound(true);
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

  return (
    <div className=" p-4 sm:p-10 mx-0 lg:max-w-6xl md:mx-5 xl:mx-auto">
      {/* Profile Info */}
      {userInfo?.user_name ? (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="justify-center avatar md:col-span-1">
              <div>
                <img
                  className="mx-auto rounded-full w-36 h-36 md:mx-0 cursor-pointer"
                  src={userInfo.profilePic}
                  alt="profile pic"
                  onClick={openWindow}
                />
                {isPop && <EditProfilePic onClose={closeWindow} />}
              </div>
            </div>
            <div className="md:col-span-3">
              <span className="mr-20 text-2xl text-gray-700">
                {userInfo.user_name}
              </span>
              {userData._id !== userInfo._id && (
                <>
                  <button
                    className="p-2 my-2 text-white font-semibold bg-blue-500 rounded hover:bg-blue-600"
                    onClick={() => followUser(userInfo._id)}
                  >
                    {userInfo.followers.find((followers) => {
                      return followers._id === userData._id;
                    })
                      ? "Unfollow"
                      : "Follow"}
                  </button>
                  <button
                    className="p-2 my-2 ml-1 text-white font-semibold bg-blue-500 rounded hover:bg-blue-600"
                    onClick={() => handleSendMessage(userInfo._id)}
                  >
                    Message
                  </button>
                </>
              )}
              {userData._id === userInfo._id && (
                <Link to={"/edit_user"}>
                  <button className="p-2 my-2 text-white font-semibold bg-blue-500 rounded hover:bg-blue-600">
                    Edit User
                  </button>
                </Link>
              )}
              {/* <div className="inline text-sm font-semibold text-blue-400 cursor-pointer">
                Edit Profile
              </div> */}
              <div className="flex mt-2 md:mt-4">
                <div className="mr-6">
                  <span className="font-semibold">
                    {postsInfo.length + " "}
                  </span>
                  posts
                </div>
                <div
                  onClick={() => setShowFollowers(true)}
                  className="mr-6 cursor-pointer"
                >
                  <span className="font-semibold">
                    {userInfo.followers?.length + " "}
                  </span>
                  followers
                </div>
                {showFollowers && (
                  <FollowersList
                    setShowFollowers={setShowFollowers}
                    follow={userInfo.followers}
                    title={"Followers"}
                  />
                )}
                <div
                  onClick={() => setShowFollowing(true)}
                  className="mr-6 cursor-pointer"
                >
                  <span className="font-semibold">
                    {userInfo.followings?.length + " "}
                  </span>
                  following
                </div>
                {showFollowing && (
                  <FollowersList
                    setShowFollowing={setShowFollowing}
                    follow={userInfo.followings}
                    title={"Following"}
                  />
                )}
              </div>
              <div className="mt-2 md:mt-4">
                <div className="pt-2">
                  <span className="text-lg font-semibold text-gray-700">
                    {userInfo.name}
                  </span>
                </div>
                <div className="pt-2">
                  <p className="text-base text-blue-700">{userInfo.desc}</p>
                </div>
                <div></div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <hr className="mt-6 border" />
          <div className="flex justify-center gap-10">
            <button
              onClick={() => show("userPosts")}
              className="flex gap-2 py-4 text-sm font-semibold text-gray-400 border-gray-300 focus:border-t focus:text-gray-600"
            >
              Posts
            </button>
            {userData._id === userInfo._id && (
              <>
                <button
                  onClick={() => show("likedposts")}
                  className="flex gap-2 py-4 text-sm font-semibold text-gray-400 border-gray-300 focus:border-t focus:text-gray-600">
                  Liked
                </button>
                <button
                  onClick={() => show("saves")}
                  className="flex gap-2 py-4 text-sm font-semibold text-gray-400 border-gray-300 focus:border-t focus:text-gray-600"
                >
                  Saved
                </button>
              </>
            )}
            <button
              onClick={() => show("gallery")}
              className="flex gap-2 py-4 text-sm font-semibold text-gray-400 border-gray-300 focus:border-t focus:text-gray-600"
            >
              Gallery
            </button>
          </div>
          {postsInfo.length == 0 && (
            <h1 className="text-center mt-5 font-semibold">no posts yet 😕 </h1>
          )}

          {/* Gallery */}
          {showGallery && <Gallery postsInfo={postsInfo} />}
          {showUserPosts && (
            <>
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
                />
              ))}
              {/* <Intersector /> */}
            </>
          )}
          {showUserSaves && (
            <>
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
                />
              ))

              }
            </>)}

          {showUserLikes && (
            <>
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
                />
              ))

              }
            </>)}
        </>
      ) : (
        userNotFound && <UserNotFound />
      )}
    </div>
  );
};

export default Profile;
