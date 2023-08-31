import {
  ArrowCircleDownIcon,
  ChatIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../context/myContext";
import { TOKEN_KEY, URL } from "../services/apiService";

const Chatbot = () => {
  const { userData } = useContext(MyContext);
  const [value, setValue] = useState("");
  const [message, setMessage] = useState(null);
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);
  const [loading, setLoading] = useState(false);

  const createNewChat = () => {
    setMessage(null);
    setValue("");
    setCurrentTitle(null);
  };

  const onKeyboardClick = (e) => {
    if (e.key === "Enter") {
      getMessages();
    }
  };

  const handleClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle);
    setMessage(null);
    setValue("");
  };

  const getMessages = async () => {
    const options = {
      method: "POST",
      data: {
        message: value,
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      setLoading(true);
      const response = await axios.post(
        URL + "/openai/completions",
        options.data,
        { headers: options.headers }
      );
      const data = response.data;
      // console.log(data);
      setMessage(data.choices[0].message);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // console.log(currentTitle, value, message);
    if (!currentTitle && value && message) {
      setCurrentTitle(value);
    }
    if (currentTitle && value && message) {
      setPreviousChats((prevChats) => [
        ...prevChats,
        {
          title: currentTitle,
          role: "user",
          content: value,
        },
        {
          title: currentTitle,
          role: message.role,
          content: message.content,
        },
      ]);
    }
  }, [message, currentTitle]);

  const currentChat = previousChats.filter(
    (previousChat) => previousChat.title === currentTitle
  );

  const uniqueTitles = Array.from(
    new Set(previousChats.map((previousChat) => previousChat.title))
  );

  //   console.log(uniqueTitles);

  return (
    <div className="flex">
      {/* sidebar */}
      <div className=" max-2-xs h-[90vh] md:h-[93vh] border-r-2 overflow-y-auto md:min-w-[20rem]">
        <div className="flex flex-col  h-[90vh] md:h-[93vh] p-2">
          <div className="flex-1">
            <div>
              {/* new chat */}
              <div
                onClick={createNewChat}
                className="border-2 border-gray-200 chatRow"
              >
                <PlusCircleIcon className="w-5 h-5" />
                <p className="text-md">New Chat</p>
              </div>
            </div>
            <div className="mt-3">
              {/* chatrow */}
              {uniqueTitles?.map((uniqueTitle, index) => (
                <div
                  onClick={() => handleClick(uniqueTitle)}
                  key={index}
                  className="justify-center chatRow"
                >
                  <ChatIcon className="w-5 h-5" />
                  <div className="flex-1 hidden truncate md:inline-flex">
                    <p>{uniqueTitle}</p>
                  </div>
                  <TrashIcon className="w-5 h-5 hover:text-red-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 ">
        {/* chatbot messages */}
        <div className="flex flex-col h-[90vh] md:h-[93vh] overflow-clip ">
          {/* messages */}
          <div className="flex-1 overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-black ">
            {/* if theres no messages  */}
            {currentChat?.length === 0 && (
              <>
                <p className="mt-10 text-center ">
                  Type a message below to get started!
                </p>
                <ArrowCircleDownIcon className="w-10 h-10 mx-auto mt-5 animate-bounce" />
              </>
            )}

            {/* mapping the messages */}
            {currentChat?.map((chatMessage, index) => (
              <div key={index} className={`py-5  `}>
                <div className="flex max-w-2xl px-10 mx-auto space-x-5">
                  <img
                    className="w-8 h-8"
                    src={
                      chatMessage.role === "assistant"
                        ? "http://localhost:5173/images/vibes-logo-responsive.png"
                        : userData?.profilePic
                    }
                    alt="profile pic"
                  />
                  <p className="pt-1 text-md">{chatMessage.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* chat input */}
          <div className="text-sm bg-[#f1eded] rounded-lg">
            <div className="flex p-5 space-x-5">
              <input
                className="flex-1 bg-transparent border-none outline-none focus:ring-transparent disabled:cursor-not-allowed disabled:text-gray-300 "
                type="text"
                disabled={!localStorage[TOKEN_KEY]}
                placeholder="Ask me a question"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyboardClick}
              />

              <button
                className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed "
                disabled={!localStorage[TOKEN_KEY] || loading || value == ""}
                type="submit"
                onClick={getMessages}
              >
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <PaperAirplaneIcon className="w-4 h-4 rotate-45" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
