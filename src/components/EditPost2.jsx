import { PencilIcon, XIcon } from "@heroicons/react/solid";
import { React, useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { MyContext } from "../context/myContext";
import { URL, doApiMethod } from "../services/apiService";

const EditPost2 = ({ post_id, description, setShowEdit }) => {
  const { setPostsInfo } = useContext(MyContext);

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
      }
    } catch (error) {
      alert("there's problem, try again later");
    }
  };

  const onSub = (_bodyData) => {
    doApiEdit(_bodyData);
  };

  const handleOverlayClick = (event) => {
    // Check if the click occurred on the black overlay itself, not the content area
    if (event.target.classList.contains("bg-black")) {
      setShowEdit(false);
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 flex z-50 justify-center items-center bg-black bg-opacity-80"
    >
      <div className="flex flex-col items-center justify-center flex-1 max-w-sm px-2 mx-auto">
        <div className="w-full px-6 py-4 rounded-lg  bg-white   ">
          <div className="flex justify-between items-center p-3 border-b">
            <h2 className="text-lg font-semibold">Edit Post </h2>
            <XIcon
              onClick={() => setShowEdit(false)}
              className="h-5 w-5 cursor-pointer"
            />
          </div>

          <form onSubmit={handleSubmit(onSub)}>
            <div className="relative p-1 mt-1 rounded-md lg:mt-4">
              <label className="ml-2 font-semibold">description:</label>
              <div className="relative p-1 mt-1 rounded-md lg:mt-4">
                <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                  <PencilIcon className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  defaultValue={description}
                  {...register("description", {
                    required: true,
                    minLength: 2,
                  })}
                  type="text"
                  className="block w-full pl-10 border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm bg-gray-50"
                />
              </div>
              {errors.description && (
                <div className="text-danger">
                  *Enter valid description(min 2 chars)
                </div>
              )}
              <button className="w-full py-3 my-1 mt-2 font-semibold text-center text-white bg-blue-500 rounded hover:bg-blue-600">
                Confirm Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPost2;
