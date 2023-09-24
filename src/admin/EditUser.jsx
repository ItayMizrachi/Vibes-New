import { PencilIcon, UserIcon, XIcon } from "@heroicons/react/solid";
import { React, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { URL, doApiGet, doApiMethod } from "../services/apiService";

const EditUser = () => {
  const [loading, setIsLoading] = useState(false);
  const params = useParams();
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [item, setItem] = useState({});

  useEffect(() => {
    doApiInit();
  }, []);

  const doApiInit = async () => {
    try {
      const url = URL + "/users/OtherInfo/" + params["id"];
      const data = await doApiGet(url);
      console.log(data);
      setItem(data);
    } catch (error) {
      console.log(error);
    }
  };

  const doApiEdit = async (_bodyData) => {
    try {
      const url = URL + "/users/" + params["id"];
      const data = await doApiMethod(url, "PUT", _bodyData);

      if (data.modifiedCount) {
        toast.success("user updated");
        nav("/admin/users");
      }
    } catch (error) {
      alert("there problem2222");
    }
  };

  const onSub = (_bodyData) => {
    console.log(_bodyData);
    doApiEdit(_bodyData);
  };

  return (
    <div
      className="fixed inset-0 flex z-50 justify-center items-center bg-black bg-opacity-90"
    >
      <div className="flex flex-col items-center justify-center flex-1 max-w-md px-4 py-8 mx-auto bg-white dark:bg-slate-900 shadow-xl rounded-xl">
        <div className="w-full bg-white dark:bg-slate-900">
          <div className="flex justify-between items-center border-b dark:border-slate-600 pb-3 mb-4">
            <h2 className="text-xl font-bold">Edit User</h2>
            <XIcon onClick={() => {
              nav("/admin/users")
            }}
              className="h-6 w-6 cursor-pointer hover:text-gray-500 transition duration-200"
            />
          </div>
          {item.name &&

            <form onSubmit={handleSubmit(onSub)}>
              {/* User Name */}
              <div className="mb-6">
                <label className="block font-semibold mb-2">Name</label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <UserIcon className="w-5 h-5 text-gray-500" />
                  </div>
                  <input
                    className="block w-full pl-12 pr-4 py-2 border rounded-md shadow-sm bg-transparent focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100"
                    type="text"
                    placeholder={item.name}
                    {...register("name", { required: true, minLength: 2 })}
                  />
                </div>
                {errors.name && (
                  <div className="text-sm text-red-600">
                    *Enter valid name (min 2 chars)
                  </div>
                )}
              </div>
              {/* Gender */}
              <div className="mb-6">
                <label className="block font-semibold mb-2">Gender</label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <UserIcon className="w-5 h-5 text-gray-500" />
                  </div>
                  <select
                    className="block w-full pl-12 p-2 border rounded-md shadow-sm dark:bg-slate-900 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100"
                    {...register("gender", { required: true })}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                {errors.gender && (
                  <div className="text-sm text-red-600">
                    *Please select a gender
                  </div>
                )}
              </div>
              {/* Description */}
              <div className="mb-6">
                <label className="block font-semibold mb-2">Description</label>
                <div className="relative mt-1">
                  <div className="absolute top-2 left-0 flex items-start pl-3">
                    <PencilIcon className="w-5 h-5 text-gray-500" />
                  </div>
                  <textarea
                    className="block w-full pl-12 pr-4 py-2 border bg-transparent rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100"
                    rows="3"
                    placeholder={item.desc}
                    {...register("desc", { required: true, minLength: 6 })}
                  />
                </div>
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 font-semibold text-white bg-indigo-500 rounded-lg transition duration-300 hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              >
                {loading ? "Loading..." : "Edit User"}
              </button>
            </form>
          }
        </div>
      </div>
    </div>
  );
};

export default EditUser;
