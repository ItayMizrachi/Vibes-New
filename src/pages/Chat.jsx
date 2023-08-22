import {
  ArrowCircleDownIcon,
  ChatIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import InputEmojiWithRef from "react-input-emoji";
import { Link, useNavigate, useParams } from "react-router-dom";
import SearchChat from "../components/chat/SearchChat";
import { MyContext } from "../context/myContext";
import { URL, doApiGet, doApiMethod } from "../services/apiService";
import LoadingPage from "./LoadingPage";

const Chat = () => {
  const { userData } = useContext(MyContext);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [activeChatId, setActiveChatId] = useState(null);
  const [text, setText] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [otherParticipant, setOtherParticipant] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const nav = useNavigate();

  const { otherUser_id } = useParams();

  useEffect(() => {
    if (otherUser_id) {
      startNewChat([userData._id, otherUser_id]);
    }
  }, []);

  useEffect(() => {
    if (activeChatId) {
      doApiMesssages(activeChatId);
    }
  }, [activeChatId, otherParticipant]);

  // useEffect(() => {
  //   console.log(chats);
  // }, [chats]);

  useEffect(() => {
    if (userData._id) {
      doApiChats();
    }
  }, [userData]);

  const doApiChats = async () => {
    try {
      setIsLoading(true);
      const url = `${URL}/chats/${userData._id}`;
      const data = await doApiGet(url);
      setChats(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const doApiMesssages = async (chatId) => {
    try {
      const url = `${URL}/message/${chatId}`;
      const data = await doApiGet(url);
      setMessages(data);
      //   const read = await axios.put(URL + "/message/mark-as-read/" + chatId);
      // Find the other participant and set their information
      const activeChat = chats.find((item) => item._id === chatId);
      const otherParticipant = activeChat.participants.find(
        (participant) => participant._id !== userData._id
      );
      setOtherParticipant(otherParticipant);
      nav(`/chat/${otherParticipant._id}`);
      setActiveChatId(chatId);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async (chatId) => {
    try {
      const url = `${URL}/message`;
      const body = {
        chat: chatId,
        sender: userData._id,
        content: text || messageInput,
      };
      const response = await doApiMethod(url, "POST", body);

      // Refresh messages
      doApiMesssages(chatId);
      doApiChats();
      // Clear message input
      setText("");
      setMessageInput("");
    } catch (error) {
      console.log(error);
    }
  };

  const onSendMessage = () => {
    if (activeChatId) {
      sendMessage(activeChatId);
    } else {
      console.log("No active chat to send a message to.");
      // You can display a message to the user or take another action here
    }
  };

  const onKeyboardClick = (e) => {
    if (e.key === "Enter") {
      onSendMessage();
    }
  };

  const startNewChat = async (selectedParticipants) => {
    try {
      const url = `${URL}/chats`;
      const body = {
        participants: selectedParticipants,
      };
      const response = await doApiMethod(url, "POST", body);
      console.log(response);
      if (response) {
        setActiveChatId(response._id);
        doApiMesssages(response._id);
        doApiChats();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.error ===
          "Chat with these participants already exists"
      ) {
        // Redirect the user to the existing chat
        const existingChat = error.response.data.existingChat;
        setActiveChatId(existingChat._id);
        doApiMesssages(existingChat._id);
        doApiChats();
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex">
      {/* sidebar */}
      <div className=" max-2-xs scrollbar-thin scrollbar-thumb-black h-[87vh] md:h-[91vh] border-r-2 overflow-y-auto md:min-w-[20rem]">
        <div className="flex flex-col  h-[87vh] md:h-[91vh] p-2">
          <div className="flex-1">
            {loading && <LoadingPage />}
            <div>
              {/* new chat */}
              <div className="p-2 hidden z-10 md:inline-flex">
                <SearchChat
                  startNewChat={startNewChat}
                  user_id={userData._id}
                  setShowSearch={setShowSearch}
                />
              </div>
              <div
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 flex items-center justify-center chatRow py-5 md:hidden"
              >
                {/* Show the SearchIcon only on small screens */}
                <SearchIcon className="w-5 h-5 text-center" />
              </div>
            </div>
            <div className="mt-3">
              {/* chatrow */}
              {chats.length > 0 ? (
                <>
                  {chats.map((item) => (
                    <div
                      key={item._id}
                      className={` chatRow ${
                        item._id === activeChatId ? "bg-[#f1eded]" : ""
                      }`}
                      onClick={() => doApiMesssages(item._id)} // Call doApiMessages with the chat ID when clicked
                    >
                      <div className="flex-1  truncate ">
                        {/* Check each participant's _id and display user_name and profilePic of the other participant */}
                        {item.participants &&
                          item.participants.map(
                            (participant) =>
                              participant._id !== userData._id && (
                                <div
                                  key={participant._id}
                                  className="flex items-center space-x-2"
                                >
                                  <div className="w-7 h-7">
                                    <img
                                      className="object-cover w-full h-full rounded-full "
                                      src={participant.profilePic}
                                      alt={`Profile pic of ${participant.user_name}`}
                                    />
                                  </div>
                                  <p className="font-semibold hidden md:inline-flex">
                                    {participant.user_name}
                                  </p>
                                </div>
                              )
                          )}
                      </div>
                      <ChatIcon className="w-5 h-5 hidden md:inline-flex text-gray-400" />
                      {/* {item.last_updated &&   moment(item?.last_updated).fromNow() }  */}
                    </div>
                  ))}
                </>
              ) : (
                <div className="justify-center chatRow">
                  <ChatIcon className="w-5 h-5" />

                  <div className="flex-1 hidden truncate md:inline-flex">
                    <p>no chats yet</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1">
        {/* chatbot messages */}
        <div className="flex flex-col h-[87vh] md:h-[91vh] overflow-clip">
          {/* messages */}
          {otherParticipant && (
            <div className="flex items-center border-b p-2 py-4 sticky top-0 z-10 bg-white">
              {/* <ArrowLeftIcon className="w-5 h-5 ml-1 cursor-pointer btn"/> */}
              <Link to={"/" + otherParticipant.user_name}>
                <img
                  className="w-10 h-10 rounded-full mr-2 ml-2"
                  src={otherParticipant.profilePic}
                  alt={`Profile pic of ${otherParticipant.user_name}`}
                />
              </Link>
              <Link to={"/" + otherParticipant.user_name}>
                <p className="font-semibold">{otherParticipant.user_name}</p>
              </Link>
            </div>
          )}

          {showSearch && (
            <div className="p-4 z-50 absolute lg:hidden md:hidden">
              <SearchChat
                startNewChat={startNewChat}
                user_id={userData._id}
                setShowSearch={setShowSearch}
              />
            </div>
          )}
          <div className="flex-1 p-4 overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-black">
            {/* if there are no messages */}
            {messages?.length === 0 ? (
              <div className="flex flex-col pt-10 h-full">
                <p className="mt-10 text-center">Start a conversation!</p>
                <ArrowCircleDownIcon className="w-10 h-10 mx-auto mt-5 animate-bounce" />
              </div>
            ) : (
              // mapping the messages
              messages.map((message) => (
                <div
                  key={message._id}
                  className={`flex w-full mt-2 ${
                    message.sender._id !== userData._id ? "justify-end" : ""
                  }`}
                >
                  {message.sender._id !== userData._id && (
                    <Link to={"/" + message.sender.user_name}>
                      <div className="w-10 h-10">
                        <img
                          className=" w-full h-full rounded-full mr-2 object-cover"
                          src={message.sender.profilePic}
                          alt={`Profile pic of ${message.sender.user_name}`}
                        />
                      </div>
                    </Link>
                  )}

                  <div
                    className={`flex flex-col max-w-xs ${
                      message.sender._id === userData._id
                        ? "ml-auto"
                        : "mr-auto"
                    }`}
                  >
                    <div
                      className={`${
                        message.sender._id === userData._id
                          ? "bg-[#378df0] p-3 text-white rounded-l-lg rounded-br-lg"
                          : "bg-[#f1eded] p-3 rounded-r-lg rounded-bl-lg"
                      } ml-2`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <span
                        className={`text-xs  leading-none mt-2 ${
                          message.sender._id === userData._id
                            ? "ml-auto text-[#c1d9f6]"
                            : "mr-auto text-gray-400 "
                        }`}
                      >
                        {moment(message.date_created).fromNow()}
                      </span>
                    </div>
                  </div>
                  {message.sender._id === userData._id && (
                    <Link to={"/" + message.sender.user_name}>
                      <div className="w-10 h-10 ml-1">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src={message.sender.profilePic}
                          alt={`Profile pic of ${message.sender.user_name}`}
                        />
                      </div>
                    </Link>
                  )}
                </div>
              ))
            )}
          </div>

          {/* chat input */}
          <div className="text-sm bg-[#f1eded] rounded-lg">
            <div className="flex p-5 space-x-5">
              <input
                className="flex-1  lg:hidden md:hidden bg-transparent border-none outline-none focus:ring-transparent disabled:cursor-not-allowed disabled:text-gray-300 "
                type="text"
                placeholder="Type a message"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={onKeyboardClick}
                disabled={!activeChatId} // Disable the input if there's no active chat
              />

              <div className="search-cont send-message w-full hidden md:inline-flex">
                <InputEmojiWithRef
                  className="flex-1  bg-transparent border-none outline-none focus:ring-transparent disabled:cursor-not-allowed disabled:text-gray-300 "
                  type="text"
                  disabled={!activeChatId} // Disable the input if there's no active chat
                  value={text}
                  onChange={setText}
                  cleanOnEnter
                  onEnter={onSendMessage}
                  placeholder="Type a message"
                />
              </div>

              <button
                className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed "
                type="submit"
                onClick={onSendMessage}
                disabled={!activeChatId} // Disable the button if there's no active chat
              >
                <PaperAirplaneIcon className="w-4 h-4 rotate-45" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
