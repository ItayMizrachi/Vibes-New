import {
  BellIcon,
  CameraIcon,
  ChatIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../context/myContext";
import { TOKEN_KEY, URL, doApiGet } from "../services/apiService";
import ImageAi from "./ImageAi";
import Noftlications from "./Noftlications";
import AddPost from "./post/AddPost";
import Dalle4 from "./Dalle4";

const BottomHeader = () => {
  const { userData } = useContext(MyContext);
  const [showAddPost, setShowAddPost] = useState(false);
  const [showNoftlications, setShowNoftlications] = useState(false);
  const [showImgAi, setShowImgAi] = useState(false);

  const toggleNoftlications = () => {
    setShowNoftlications(!showNoftlications);
  };
  const [isRead, setIsRead] = useState({ unreadCount: 0 });

  const doApiUnreadCount = async () => {
    try {
      const url = URL + "/notifications/unread-count/" + userData?._id;
      const data = await doApiGet(url);
      setIsRead(data);
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (userData._id) {
      doApiUnreadCount();
    }
  }, [userData]);

  return (
    <header className="sticky bottom-0 p-5 left-0 right-0 z-30  bg-white border-t shadow-s  lg:hidden md:hidden">
      {showNoftlications && (
        <Noftlications
          setIsRead={setIsRead}
          setShowNoftlications={setShowNoftlications}
        />
      )}
      {showAddPost && <AddPost setShowAddPost={setShowAddPost} />}
      {showImgAi && <Dalle4 setShowImgAi={setShowImgAi} />}
      <div className="flex items-center justify-around">
        {localStorage[TOKEN_KEY] && userData ? (
          <>
            <Link to="/">
              <HomeIcon className="lowNavBtn" />
            </Link>
            <div className="relative lowNavBtn">
              <BellIcon onClick={toggleNoftlications} className="lowNavBtn" />
              {isRead.unreadCount > 0 && (
                <div className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-1 -right-2 animate-pulse">
                  {isRead.unreadCount}
                </div>
              )}
            </div>

            <PlusCircleIcon
              onClick={() => setShowAddPost(true)}
              className="lowNavBtn"
            />
            <CameraIcon
              onClick={() => setShowImgAi(true)}
              className="lowNavBtn"
            />

            {/* <Link to="chatbot">
              <AcademicCapIcon className="lowNavBtn" />
            </Link> */}
            <Link to="chat">
              <ChatIcon className="lowNavBtn" />
            </Link>
          </>
        ) : (
          <>
            <Link to="signin" className="text-sm font-semibold text-indigo-500">
              sign in
            </Link>
            <p className="font-semibold text-gray-400"> | </p>
            <Link to="signup" className="text-sm font-semibold text-indigo-500">
              sign up
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default BottomHeader;
