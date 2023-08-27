import { ArrowCircleDownIcon } from "@heroicons/react/outline";
import { PaperAirplaneIcon, XIcon } from "@heroicons/react/solid";
import { animated, useSpring } from "@react-spring/web";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MyContext } from "../context/myContext";
import { TOKEN_KEY, URL, doApiMethod } from "../services/apiService";
const ChatBotNew = () => {
  const [showChat, setShowChat] = useState(false);
  const { userData } = useContext(MyContext);
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const onKeyboardClick = (e) => {
    if (e.key === "Enter") {
      getMessages();
    }
  };

  const getMessages = async () => {
    try {
      setLoading(true);
      const url = URL + "/openai/completions";
      const data = await doApiMethod(url, "POST", { message: value });
      // console.log(data);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", content: value },
        {
          role: data.choices[0].message.role,
          content: data.choices[0].message.content,
        },
      ]);
      setValue("");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.pathname.includes("chat")) {
      setShowChat(false);
    }
  }, [location]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Scroll the chat container to the bottom whenever messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const chatButtonSpring = useSpring({
    to: {
      opacity: showChat ? 0 : 1
    },
    config: { tension: 260, friction: 60 },
  });
  
  
  const chatWindowSpring = useSpring({
    to: {
      opacity: showChat ? 1 : 0,
      transform: showChat ? 'scale(1)' : 'scale(0)'
    },
    config: { tension: 360, friction: 60 },
  });
  
  return (
    <>
      {/* button */}
      {localStorage[TOKEN_KEY] && !showChat && (
        <animated.div style={chatButtonSpring} 
          className={`fixed transform transition-transform duration-300 md:bottom-3 bottom-20 right-3 z-[1] ${
            location.pathname.includes("chat") && "hidden"
          }`}
          onClick={() => setShowChat(!showChat)} // Added hover to show chat for a more fluid interaction
        >
          <button
            onClick={() => setShowChat(!showChat)}
            className="md:w-14 md:h-14 w-11 h-11 cursor-pointer border-2 border-gray-200 bg-white p-1 rounded-md shadow-lg hover:shadow-xl hover:border-indigo-100 transition-all duration-300"
            aria-label="Open chat"
          >
            <img
              className="w-full h-full rounded-full object-cover transform hover:scale-105 transition-transform duration-300"
              src="/images/vibes-logo-responsive.png"
              alt="vibes logo"
            />
          </button>
        </animated.div>
      )}
      {/* button */}
      {showChat && (
        <animated.div
        style={chatWindowSpring}
          className={`fixed md:bottom-3 bottom-20 right-3 bg-white border rounded-lg shadow-lg h-[400px] w-[360px] md:w-[400px] md:h-[500px] z-10  ${
            location.pathname.includes("chat") && "hidden"
          } `}
        >
          <div className="flex">
            <div className="flex-1">
              <div className="flex flex-col md:h-[500px] h-[400px] overflow-clip">
                {/* chat header */}
                <div className="flex items-center border-b rounded-lg p-2 px-3 py-4 sticky top-0 z-10 bg-white">
                  {/* <ArrowLeftIcon className="w-5 h-5 ml-1 cursor-pointer btn"/> */}
                  <div className="flex-shrink-0 w-10 mr-1">
                    <img
                      className={`object-contain w-full h-full ${loading && "animate-spin"}`}
                      src="/images/vibes-logo-responsive.png"
                      alt={`vibes logo`}
                    />
                  </div>
                  <p className="font-semibold">Vibes Assistant</p>
                  <XIcon
                    onClick={() => setShowChat(false)}
                    className="h-5 w-5 ml-auto mr-2 cursor-pointer hover:text-gray-500 transition duration-200"
                  />
                </div>
                {/* chat header */}

                <div className="flex-1 p-4 overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-black">
                  {/* if there are no messages */}
                  {messages?.length === 0 ? (
                    <div className="flex flex-col pt-4 h-full">
                      <p className="text-center">Ask me a question!</p>
                      <ArrowCircleDownIcon className="w-10 h-10 mx-auto mt-5 animate-bounce" />
                    </div>
                  ) : (
                    // mapping the messages
                    messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex w-full mt-2 ${
                          message.role === "assistant" ? "justify-end" : ""
                        }`}
                      >
                        {message.role === "assistant" && (
                          <div className="w-10 h-10">
                            <img
                              className="object-cover w-full h-full rounded-full mr-2"
                              src="http://localhost:5173/images/vibes-logo-responsive.png"
                              alt={`vibes logo`}
                            />
                          </div>
                        )}

                        <div
                          className={`flex flex-col max-w-xs ${
                            message.role !== "assistant" ? "ml-auto" : "mr-auto"
                          }`}
                        >
                          <div
                            className={`${
                              message.role !== "assistant"
                                ? "bg-indigo-500 hover:bg-indigo-600 p-3 text-white rounded-l-lg rounded-br-lg"
                                : "bg-[#f1eded] hover:bg-[#ebe5e5]  p-3 rounded-r-lg rounded-bl-lg"
                            } ml-2`}
                          >
                            <p className="text-sm start">{message.content}</p>
                          </div>
                        </div>
                        {message.role !== "assistant" && (
                          <Link to={"/" + userData.user_name}>
                            <div className="w-10 h-10 ml-1">
                              <img
                                className="object-cover w-full h-full rounded-full"
                                src={userData.profilePic}
                                alt={`Profile pic of ${userData.profilePic}`}
                              />
                            </div>
                          </Link>
                        )}
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef}></div>
                </div>

                {/* chat input */}

                <div className="flex p-5 space-x-1">
                  <input
                    className="flex-1 border rounded-lg p-2 outline-none disabled:cursor-not-allowed disabled:text-gray-300 "
                    type="text"
                    placeholder="Ask me a question.."
                    disabled={!localStorage[TOKEN_KEY]}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={onKeyboardClick}
                  />
                  <button
                    className="px-4 py-2 font-bold text-white transition duration-200 bg-indigo-500 rounded hover:bg-indigo-600 disabled:bg-indigo-300 disabled:cursor-not-allowed "
                    disabled={
                      !localStorage[TOKEN_KEY] || loading || value == ""
                    }
                    type="submit"
                    onClick={getMessages}
                    // Disable the button if there's no active chat
                  >
                    <PaperAirplaneIcon className="w-4 h-4 rotate-45" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </animated.div>
      )}
    </>
  );
};

export default ChatBotNew;
