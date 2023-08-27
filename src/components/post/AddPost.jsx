import { CameraIcon, XIcon } from "@heroicons/react/outline";
import { PencilIcon } from "@heroicons/react/solid";
import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import InputEmoji from "react-input-emoji";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MyContext } from "../../context/myContext";
import { URL, doApiMethod, imgToString } from "../../services/apiService";

const AddPost = ({ setShowAddPost }) => {
  const [isLoading, setIsLoading] = useState(false); // Add state for loading
  const { addNewPost } = useContext(MyContext);
  const nav = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [text, setText] = useState("");

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setImagePreview(null);
    }
  };

  const uploadRef = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let url2;

  const onSubForm = async (_bodyData) => {
    console.log(_bodyData);
    setIsLoading(true); // Start loading when form is submitted
    await doApiCloudUpload();
    doApiPost(_bodyData);
  };

  const doApiCloudUpload = async () => {
    try {
      const myFile = uploadRef.current.files[0];
      const imgData = await imgToString(myFile);
      const url = URL + "/upload/cloud";
      const resp = await doApiMethod(url, "POST", { image: imgData });
      console.log(resp.data);
      url2 = resp.data.secure_url;
      console.log(url2);
    } catch (err) {
      console.log(err);
    }
  };

  const doApiPost = async (_bodyData) => {
    try {
      const url = URL + "/userPosts";
      _bodyData.img_url = url2;
      // console.log(url2);
      // console.log(_bodyData);
      const data = await doApiMethod(url, "POST", _bodyData);
      if (data._id) {
        toast.success("Post added");
        setShowAddPost(false);
      }
      addNewPost(data);
      nav("/");
    } catch (error) {
      console.log(error);
      toast.error("There's a problem");
    } finally {
      setIsLoading(false); // Stop loading after redirecting
    }
  };

  const handleOverlayClick = (event) => {
    // Check if the click occurred on the black overlay itself, not the content area
    if (event.target.classList.contains("bg-black")) {
      setShowAddPost(false);
    }
  };

  function handleOnEnter(event) {
    event.preventDefault();
    onSubForm({ description: text });
    setText("");
  }
  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-90 z-50"
    >
    <div className="flex flex-col items-center justify-center flex-1 max-w-md px-4 py-8 mx-auto bg-white shadow-xl rounded-xl overflow-y-auto scrollbar-thin overflow-x-hidden scrollbar-thumb-black">

        <div className="w-full max-h-[70vh]">
          <div className="flex justify-between items-center pb-3 mb-4 border-b">
            <h2 className="text-xl font-bold flex items-center">
              Add Post
              <CameraIcon className="w-5 h-5 ml-2" />
            </h2>
            <XIcon
              onClick={() => setShowAddPost(false)}
              className="h-6 w-6 cursor-pointer hover:text-gray-500 transition duration-200"
            />
          </div>

          <form>
            <div className="mb-6 relative">

              {/* For small screens */}
              <label className="block font-semibold mb-2">Description</label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <PencilIcon className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  className="block w-full pl-12 pr-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100" // Enhanced input style
                  type="text"
                  placeholder="description"
                  required
                  onChange={(e) => setText(e.target.value)}
                />
              </div>

              <div className="w-full hidden">
                <InputEmoji
                  value={text}
                  onChange={setText}
                  placeholder="description"
                />
              </div>

              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="my-4 w-full rounded-md shadow" // Adjusted size and added shadow
                />
              )}
            </div>

            <div className="mb-6">
              <label className="block font-semibold mb-2">Image</label>
              <input
                required
                ref={uploadRef}
                onChange={handleImageChange}
                type="file"
                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50 transition duration-200" // Enhanced input style
              />
            </div>

            <button
              onClick={handleOnEnter}
              type="submit"
              className={`w-full py-3 font-semibold text-white bg-indigo-500 rounded-lg transition duration-300 hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-400 focus:outline-none ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Posting..." : "Post"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
