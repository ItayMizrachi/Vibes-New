import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { URL, doApiMethod, imgToString } from "../../services/apiService";

const Uploader = () => {
  const [isLoading, setIsLoading] = useState(false); // Add state for loading
  const uploadRef = useRef();
  const nav = useNavigate();
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
      console.log(url2);
      console.log(_bodyData);
      const data = await doApiMethod(url, "POST", _bodyData);
      nav("/");
      if (data._id) {
        toast.success("Post added");
      }
    } catch (error) {
      console.log(error);
      toast.error("There's a problem");
    } finally {
      setIsLoading(false); // Stop loading after redirecting
    }
  };

  return (
    <div className="flex justify-center mt-5 lg:my-20">
      <div className="container max-w-md p-4 mx-auto">
        <div className="w-full px-6 py-8 bg-white border rounded shadow-md">
          <h1 className="mb-8 text-3xl font-semibold text-center">
            Add a new post
          </h1>

          <form onSubmit={handleSubmit(onSubForm)}>
            <div className="mb-4">
              <label className="block">Description</label>
              <input
                {...register("description", { required: true, minLength: 2 })}
                className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                type="text"
                placeholder="green apple tree"
              />
              {errors.description && (
                <div className="mt-1 text-red-500">
                  * Enter a valid description
                </div>
              )}
            </div>

            <div className="mb-4">
              <label className="block">Image</label>
              <input
                ref={uploadRef}
                type="file"
                className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className={`w-full py-3 mt-4 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Post"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};


export default Uploader