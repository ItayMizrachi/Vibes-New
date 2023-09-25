import { XIcon } from "@heroicons/react/outline";
import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { MyContext } from "../../context/myContext";
import { URL, doApiMethod, imgToString } from "../../services/apiService";

const EditProfilePic = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false); // Add state for loading
  const { userData, setUserData } = useContext(MyContext);

  const [imagePreview, setImagePreview] = useState(null);

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
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  const doApiPost = async (_bodyData) => {
    try {
      const url = URL + "/users/" + userData._id;
      _bodyData.profilePic = url2;
      console.log(url2);
      console.log(_bodyData);
      const data = await doApiMethod(url, "PUT", _bodyData);
      if (data.modifiedCount) {
        toast.success("pic changed");
        window.location.reload();
        setShowAddPost(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); // Stop loading after redirecting
    }
  };

  const handleOverlayClick = (event) => {
    if (event.target.classList.contains("bg-black")) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 flex z-50 justify-center items-center bg-black bg-opacity-90 transition-opacity duration-300"
    >
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg max-w-sm px-4 py-5 space-y-4 max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-black">
        <div className="flex justify-between items-start border-b dark:border-slate-700 p-1">
          <h2 className="text-xl font-semibold">Edit Profile pic</h2>
          <XIcon
            onClick={onClose}
            className="h-6 w-6 cursor-pointer hover:text-gray-600 transition-colors duration-200"
          />
        </div>
        <form onSubmit={handleSubmit(onSubForm)}>
          <div className="space-y-4">
            <label className="block font-semibold mb-2">Upload image</label>
            <input
              required
              ref={uploadRef}
              onChange={(e) => {
                if (
                  e.target.files &&
                  e.target.files[0].type.startsWith("image/")
                ) {
                  handleImageChange(e);
                }
              }}
              type="file"
              className="w-full p-2 border dark:border-slate-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition-border duration-200"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Image Preview"
                className="my-2 rounded-md shadow-md -z-30"
              />
            )}
            <button
              type="submit"
              className={`disabled:dark:bg-gray-800 disabled:bg-gray-400/60 disabled:cursor-not-allowed w-full py-2 font-medium text-white bg-indigo-500 active:scale-95 transform rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-60 transition-all duration-200 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={imagePreview === null || isLoading}
            >
              {isLoading ? "Loading..." : "Change Profile Pic"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditProfilePic;
