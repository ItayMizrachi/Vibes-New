import { PencilIcon, XIcon } from "@heroicons/react/solid";
import { React, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import InputEmoji from "react-input-emoji";
import { toast } from "react-toastify";
import { MyContext } from "../../context/myContext";
import { URL, doApiMethod } from "../../services/apiService";

const EditPost3 = ({ post_id, description, setShowEdit }) => {
  const { setPostsInfo } = useContext(MyContext);
  const [isInputFocused, setInputFocused] = useState(false);
  const [text, setText] = useState("");
  const [loading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const doApiEdit = async (_bodyData) => {
    try {
      setIsLoading(true);
      const url = URL + "/userPosts/" + post_id;
      const data = await doApiMethod(url, "PUT", _bodyData);
      if (data.modifiedCount) {
        toast.success("post updated");
        setPostsInfo((prevPosts) =>
          prevPosts.map((post) =>
            post._id === post_id
              ? { ...post, description: _bodyData.description }
              : post
          )
        );
        setShowEdit(false);
        setIsLoading(false);
      }
    } catch (error) {
      alert("there's problem, try again later");
      console.log(error);
    }
  };

  const onSubForm = (_bodyData) => {
    doApiEdit(_bodyData);
  };

  const handleOverlayClick = (event) => {
    // Check if the click occurred on the black overlay itself, not the content area
    if (event.target.classList.contains("bg-black")) {
      setShowEdit(false);
    }
  };

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = () => {
    setInputFocused(false);
  };

  function handleOnEnter({}) {
    // Call the form submission function passed as a prop
    onSubForm({ description: text });
    setText(""); // Clear the InputEmoj after submission
  }

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 flex z-50 justify-center items-center bg-black bg-opacity-90" // Made the background slightly darker
    >
      <div className="flex flex-col items-center justify-center flex-1 max-w-md px-4 py-8 mx-auto bg-white dark:bg-slate-900 shadow-xl rounded-xl">
        {" "}
        {/* Adjusted sizing, added shadow and increased border radius */}
        <div className="w-full">
          <div className="flex justify-between items-center pb-3 mb-4 border-b dark:border-slate-700">
            <h2 className="text-xl font-bold flex items-center">
              Edit Post
              <PencilIcon className="w-5 h-5 ml-2" />
            </h2>
            <XIcon
              onClick={() => setShowEdit(false)}
              className="h-6 w-6 cursor-pointer hover:text-gray-500 transition duration-200" // Added hover effect
            />
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="relative mt-1 mb-6">
              <label className="block font-semibold mb-2">Description:</label>

              <div className="w-full small-screen">
                <InputEmoji
                  value={text}
                  onChange={setText}
                  onEnter={handleOnEnter}
                  placeholder={description}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </div>
              <button
                onClick={handleOnEnter}
                className="w-full py-3 mt-4 font-semibold text-white bg-indigo-500 active:scale-95 transsform rounded-lg transition duration-300 hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-400 focus:outline-none" // Enhanced the button style
              >
                {loading ? "Loading..." : "Confirm Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default EditPost3;
