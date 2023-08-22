import { XIcon } from "@heroicons/react/outline";
import { PencilIcon } from "@heroicons/react/solid";
import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { MyContext } from "../context/myContext";
import { URL, doApiMethod, imgToString } from "../services/apiService";

const AddPost = ({ setShowAddPost }) => {
  const [isLoading, setIsLoading] = useState(false); // Add state for loading
  const { setPostsInfo } = useContext(MyContext);

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

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 flex z-50 justify-center items-center bg-black bg-opacity-80"
    >
      <div className="flex flex-col items-center justify-center flex-1 max-w-sm px-2 mx-auto">
        <div className="w-full px-6 py-4 rounded-lg bg-white">
          <div className="flex justify-between items-center p-3 border-b">
            <h2 className="text-xl font-semibold">Add Post </h2>
            <XIcon
              onClick={() => setShowAddPost(false)}
              className="h-5 w-5 cursor-pointer"
            />
          </div>

          <form onSubmit={handleSubmit(onSubForm)}>
            <div className="mb-4 mt-4">
              <label className="font-semibold">Description</label>
              <div className="relative p-1 mt-1 rounded-md lg:mt-4">
                <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                  <PencilIcon className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  {...register("description", { required: true, minLength: 2 })}
                  className="block w-full pl-10 border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm bg-gray-50"
                  type="text"
                  placeholder="description"
                  required
                />{" "}
              </div>
              {errors.description && (
                <div className="mt-1 text-red-500">
                  * Enter a valid description
                </div>
              )}

              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="my-2 rounded-md"
                />
              )}
            </div>

            <div className="mb-4">
              <label className="font-semibold">Image</label>
              <input
                required
                ref={uploadRef}
                onChange={handleImageChange}
                type="file"
                className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500 upload"
              />
            </div>

            <button
              type="submit"
              className={`w-full py-3 mt-4 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
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
