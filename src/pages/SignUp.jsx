import {
  CameraIcon,
  LockClosedIcon,
  MailIcon,
  PencilIcon,
  UserIcon,
} from "@heroicons/react/solid";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { URL, imgToString, doApiMethod } from "../services/apiService";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const uploadRef = useRef();
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  let url2;


  const doApi = async (_bodyData) => {
    let url = URL + "/users";

    if (!_bodyData.profilePic) {
      _bodyData.profilePic =
        "/images/anonymous.jpg";
    }

    try {

      _bodyData.profilePic = url2;

      const resp = await axios({
        url: url,
        method: "POST",
        data: _bodyData,
      });
      if (resp.data._id) {
        toast.success("Welcome to our site! Please log in");
        nav("/signin");
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err.response.data.code);
      if (err.response.data.code == 11000) {
        return toast.error("Email already in system please log in");
      }
      console.log(err);
      alert("There problem, come back later");
    }
  };


  const onSub = async (_bodyData) => {
    setIsLoading(true);
    console.log(_bodyData);
    await doApiCloudUpload();
    doApi(_bodyData);
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

  const validateEmail = (value) => {
    // Regular expression to validate email format
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(value) || "Enter a valid email address";
  };

  return (
    <div className="min-h-screen mt-5 lg:mt-20 bg-grey-lighter">
      <div className="container flex flex-col items-center justify-center flex-1 max-w-sm px-2 mx-auto">
        <div className="w-full px-6 py-8 text-black bg-white rounded shadow-md">
          <h1 className="mb-8 text-3xl font-semibold text-center">Sign up</h1>

          <form onSubmit={handleSubmit(onSub)}>
            <div className="relative p-1 mt-1 rounded-md lg:mt-4">
              <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                <UserIcon className="w-5 h-5 text-gray-500" />
              </div>
              <input
                className="block w-full pl-10 border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm bg-gray-50"
                type="text"
                required
                placeholder="name"
                {...register("name", { required: true, minLength: 2 })}
              />
            </div>
            {errors.name && (
              <div className="text-red-600">*Enter valid name(min 2 chars)</div>
            )}


            <div className="relative p-1 mt-1 rounded-md lg:mt-4">
              <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                <UserIcon className="w-5 h-5 text-gray-500" />
              </div>
              <input
                className="block w-full pl-10 border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm bg-gray-50"
                type="text"
                required
                placeholder="username"
                {...register("user_name", {
                  required: true,
                  minLength: 2,
                })}
              />
            </div>
            {errors.user_name && (
              <div className="text-red-600">
                *Enter valid username(min 2 chars)
              </div>
            )}

            <div className="relative p-1 mt-1 rounded-md lg:mt-4">
              <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                <MailIcon className="w-5 h-5 text-gray-500" />
              </div>
              <input
                className="block w-full pl-10 border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm bg-gray-50"
                type="text"
                placeholder="email"
                required
                {...register("email", {
                  required: true,
                  validate: validateEmail,
                })}
              />
            </div>
            {errors.email && (
              <div className="text-red-600">
                *Enter valid email(valid email)
              </div>
            )}

            <div className="relative p-1 mt-2 rounded-md ">
              <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                <LockClosedIcon className="w-5 h-5 text-gray-500" />
              </div>
              <input
                className="block w-full pl-10 border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm bg-gray-50"
                type="password"
                placeholder="password"
                required
                {...register("password", { required: true, minLength: 6 })}
              />
            </div>
            {errors.password && (
              <div className="text-red-600">
                *Enter valid password(min 6 chars)
              </div>
            )}

            <div className="relative p-1 mt-2 rounded-md ">
              <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                <LockClosedIcon className="w-5 h-5 text-gray-500" />
              </div>
              <input
                className="block w-full pl-10 border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm bg-gray-50"
                type="password"
                placeholder="confirm password"
                required
                {...register("password", { required: true, minLength: 6 })}
              />
            </div>
            {errors.password && (
              <div className="text-red-600">
                *Enter valid password(min 6 chars)
              </div>
            )}






            <div className="relative p-1 mt-1 rounded-md lg:mt-4">
              <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                <UserIcon className="w-5 h-5 text-gray-500" />
              </div>
              <select
                className="block w-full pl-10 border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm bg-gray-50"
                required
                {...register("gender", { required: true })}
              >
                <option value="">Select gender</option>
                <option value="male"> Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <div className="text-red-600">*Please select a gender</div>
              )}
            </div>

            <div className="relative p-1 mt-1 rounded-md lg:mt-4">
              <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                <CameraIcon className="w-5 h-5 text-gray-500" />
              </div>
              <input ref={uploadRef}
                className="block w-full pl-10 border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm bg-gray-50"
                type="file"
              />
            </div>
            <div className="relative p-1 mt-2 rounded-md">
              <div className="absolute inset-y-0 flex p-3 pl-3 pointer-events-none">
                {/* Use an icon for the textarea input */}
                <PencilIcon className="w-5 h-5 text-gray-500" />
              </div>
              {/* Use the "textarea" element for the description field */}
              <textarea
                className="block w-full pl-10 border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm bg-gray-50"
                rows="3"
                placeholder="description"
                {...register("desc", { required: false, minLength: 6 })}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 my-1 mt-2 font-semibold text-center text-white bg-blue-500 rounded hover:bg-blue-600 bg-green hover:bg-green-dark focus:outline-none"
            >
              Create Account
            </button>
          </form>
        </div>

        <div className="mt-6 text-grey-dark">
          <p className="inline">Already have an account? </p>
          <Link to="/signin" className="font-semibold text-blue-500">
            sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
