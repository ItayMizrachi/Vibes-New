import {
  ArrowCircleDownIcon,
  ChatIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import moment from "moment";
import React, { useContext, useEffect, useRef, useState } from "react";
import InputEmojiWithRef from "react-input-emoji";
import { Link, useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
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
  const messagesEndRef = useRef(null);

  const socketRef = useRef(null);
  const [otherUserProfilePic, setOtherUserProfilePic] = useState("");

  // useEffect for setting up socket connection and joining chat room
  useEffect(() => {
    socketRef.current = io(URL);
    if (activeChatId) {
      socketRef.current.emit("joinRoom", activeChatId);
    }
    socketRef.current.on("receiveMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data.message]);
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, [setMessages, activeChatId]);

  // UseEffect to start a new chat when otherUser_id is available
  useEffect(() => {
    if (otherUser_id) {
      startNewChat([userData._id, otherUser_id]);
    }
  }, []);

  // UseEffect to load messages when an active chat is selected or otherParticipant changes
  useEffect(() => {
    if (activeChatId) {
      doApiMesssages(activeChatId);
    }
  }, [activeChatId, otherParticipant]);

  // UseEffect to load user's chats when userData changes
  useEffect(() => {
    if (userData._id) {
      doApiChats();
    }
  }, [userData]);

  // UseEffect to scroll to the latest message when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  // Function to fetch user's chats from the API
  const doApiChats = async () => {
    try {
      const url = `${URL}/chats/${userData._id}`;
      const data = await doApiGet(url);
      setChats(data);
    } catch (err) {
      console.log(err);
    }
  };

  // Function to fetch messages for a specific chat from the API
  const doApiMesssages = async (chatId) => {
    try {
      const url = `${URL}/message/${chatId}`;
      const data = await doApiGet(url);
      setMessages(data);
      // Find the other participant and set their information
      const activeChat = chats.find((item) => item._id === chatId);
      const otherParticipant = activeChat.participants.find(
        (participant) => participant._id !== userData._id
      );
      setOtherParticipant(otherParticipant);
      setOtherUserProfilePic(otherParticipant.profilePic);
      // console.log(otherUserProfilePic);
      nav(`/chat/${otherParticipant._id}`);
      setActiveChatId(chatId);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to send a new message
  const sendMessage = async (chatId) => {
    try {
      const url = `${URL}/message`;
      const body = {
        chat: chatId,
        sender: userData._id,
        content: text || messageInput,
      };
      const response = await doApiMethod(url, "POST", body);
      // Refresh messages and chats
      // Emit a sendMessage event to the Socket.io server
      socketRef.current.emit("sendMessage", body);
      // socketRef.current.emit("sendMessage", body, () => {
      //   // This callback is called when the server confirms message sent
      //   callback();
      // });
      doApiMesssages(chatId);
      doApiChats();
      // Clear message input
      setText("");
      setMessageInput("");
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle sending a message when a button is clicked
  const onSendMessage = () => {
    if (activeChatId) {
      sendMessage(activeChatId);
    } else {
      console.log("No active chat to send a message to.");
      // You can display a message to the user or take another action here
    }
  };

  // Function to handle sending a message when the Enter key is pressed
  const onKeyboardClick = (e) => {
    if (e.key === "Enter") {
      onSendMessage();
    }
  };

  // Function to start a new chat with selected participants
  const startNewChat = async (selectedParticipants) => {
    try {
      const url = `${URL}/chats`;
      const body = {
        participants: selectedParticipants,
      };
      const response = await doApiMethod(url, "POST", body);
      // console.log(response);
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
      <div className=" scrollbar-thin scrollbar-thumb-black h-[87vh] md:h-[91vh] border-r-2 dark:border-slate-700 overflow-y-auto min-w-[4rem] md:min-w-[20rem]">
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
                        item._id === activeChatId ? "bg-[#f1eded] dark:bg-slate-600" : ""
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
                                  className="flex justify-center md:justify-normal items-center space-x-2"
                                >
                                  <div className="md:w-7 md:h-7 w-6 h-6">
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
              {/* <Intersector /> */}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex flex-col h-[87vh] md:h-[91vh] overflow-clip">
          {/* messages */}
          {otherParticipant && (
            <div className="flex items-center border-b p-2 py-4 sticky top-0 bg-white dark:bg-slate-900 dark:border-slate-700">
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
          <div
            // key={Math.random()}
            className="flex-1 p-4 overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-black"
          >
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
                  ref={messagesEndRef}
                  key={message?._id}
                  className={`flex w-full mt-2 ${
                    message?.sender?._id !== userData._id ? "justify-end" : ""
                  }`}
                >
                  {message?.sender?._id !== userData._id && (
                    <Link to={"/" + message?.sender?.user_name}>
                      <div className="w-10 h-10">
                        <img
                          className=" w-full h-full rounded-full mr-2 object-cover"
                          src={otherUserProfilePic}
                          alt={`Profile pic of ${message?.sender?.user_name}`}
                        />
                      </div>
                    </Link>
                  )}

                  <div
                    className={`flex flex-col max-w-xs ${
                      message?.sender?._id === userData._id
                        ? "ml-auto"
                        : "mr-auto"
                    }`}
                  >
                    <div
                      className={`${
                        message?.sender?._id === userData._id
                          ? "bg-indigo-500  hover:bg-indigo-600 p-3 text-white rounded-l-lg rounded-br-lg"
                          : "bg-[#f1eded] dark:bg-slate-600 dark:hover:bg-slate-700 hover:bg-[#ebe5e5] p-3 rounded-r-lg rounded-bl-lg"
                      } ml-2`}
                    >
                      <p className="text-sm">{message?.content}</p>
                      <span
                        className={`text-xs  leading-none mt-2 ${
                          message?.sender?._id === userData._id
                            ? "ml-auto text-blue-50/80"
                            : "mr-auto text-gray-400 "
                        }`}
                      >
                        {moment(message?.date_created).fromNow()}
                      </span>
                    </div>
                  </div>
                  {message?.sender._id === userData._id && (
                    <Link to={"/" + message?.sender?.user_name}>
                      <div className="w-10 h-10 ml-1">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src={message?.sender?.profilePic}
                          alt={`Profile pic of ${message?.sender?.user_name}`}
                        />
                      </div>
                    </Link>
                  )}
                </div>
              ))
            )}
          </div>

          {/* chat input */}
          <div className="text-sm bg-[#f1eded] rounded-lg dark:bg-slate-700 chat">
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
                  className="flex-1 chatbox bg-transparent border-none outline-none focus:ring-transparent disabled:cursor-not-allowed disabled:text-gray-300 "
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
                className="px-4 py-2 font-bold text-white bg-indigo-500 rounded hover:bg-indigo-600 disabled:bg-blue-300 disabled:cursor-not-allowed "
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