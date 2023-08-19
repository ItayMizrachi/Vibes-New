import { XIcon } from "@heroicons/react/solid";
import { React, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import InputEmoji from "react-input-emoji";
import { toast } from "react-toastify";
import { MyContext } from "../context/myContext";
import { URL, doApiMethod } from "../services/apiService";

const EditPost3 = ({ post_id, description, setShowEdit }) => {
  const { setPostsInfo } = useContext(MyContext);
  const [isInputFocused, setInputFocused] = useState(false);
  const [text, setText] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const doApiEdit = async (_bodyData) => {
    try {
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
        console.log("2");
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
      className="fixed inset-0 flex z-50 justify-center items-center bg-black bg-opacity-80"
    >
      <div className="flex flex-col items-center justify-center flex-1 max-w-sm px-2 mx-auto">
        <div className="w-full px-6 py-4 rounded-lg bg-white">
          <div className="flex justify-between items-center p-3 border-b">
            <h2 className="text-lg font-semibold">Edit Post </h2>
            <XIcon
              onClick={() => setShowEdit(false)}
              className="h-5 w-5 cursor-pointer"
            />
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="relative p-1 mt-1 rounded-md lg:mt-4">
              <label className="ml-2 font-semibold">description:</label>
              {/* Replace the regular input with InputEmoj */}
              <InputEmoji
                value={text} // Use the state value
                onChange={setText} // Update the state when the value changes
                onEnter={handleOnEnter}
                placeholder={description}
                className="flex-1 border-none outline-none focus:ring-0 emoj"
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              />

              <button
                onClick={handleOnEnter}
                className="w-full py-3 my-1 mt-2 font-semibold text-center text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Confirm Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPost3;
