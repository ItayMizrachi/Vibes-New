import { LockClosedIcon, MailIcon, UserIcon } from "@heroicons/react/solid";
import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MyContext } from "../context/myContext";
import { URL, doApiMethod, imgToString } from "../services/apiService";

const SignUp = () => {
  const { setIsLoading } = useContext(MyContext);
  const uploadRef = useRef();

  const nav = useNavigate();
  let url2;

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const doApiProfilePic = async (_bodyData) => {
    let url = URL + "/users";
    _bodyData.profilePic = url2 ? url2 : "/images/anonymous.jpg";
    try {
      const resp = await axios({
        url: url,
        method: "POST",
        data: _bodyData,
      });
      if (resp.data._id) {
        toast.success("Welcome to our site! Please log in");
        nav("/signin");
      }
    } catch (err) {
      console.log(err.response.data.code);
      if (err.response.data.code == 11000) {
        return toast.error("Email already in system please log in");
      }
      console.log(err);
      alert("There's a problem, come back later");
    }
  };
  const onSub = async (_bodyData) => {
    setIsLoading(true);
    // console.log(_bodyData);
      if (uploadRef.current.files[0]) { // Check if there's a file to upload
      await doApiCloudUpload(); // Wait until the image is uploaded
    }
      doApiProfilePic(_bodyData);
    setIsLoading(false);
  };
  


  const doApiCloudUpload = async () => {
    try {
      const myFile = uploadRef.current.files[0];
      if (!myFile) return;
      const imgData = await imgToString(myFile);
      const url = URL + "/upload/cloud";
      const resp = await doApiMethod(url, "POST", { image: imgData });
      // console.log(resp.data);
      url2 = resp.data.secure_url;
      // console.log(url2);
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
    <div className="mt-20 flex justify-center items-center h-screen">
      <div className="flex w-[400px] flex-col items-center justify-center px-4 py-8 bg-white dark:bg-slate-800 shadow-xl rounded-xl">
        <div className="w-full">
          <div className="flex justify-between items-center border-b dark:border-slate-700 pb-3 mb-4">
            <h2 className="text-xl font-bold">Sign Up</h2>
          </div>
          <form onSubmit={handleSubmit(onSub)}>
            {/* Name */}
            <div className="mb-6">
              <label className="block font-semibold mb-2">Name</label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <UserIcon className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  {...register("name", { required: true, minLength: 3 })}
                  className="block dark:bg-slate-800 w-full pl-12 p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100"
                  type="text"
                  placeholder="name"
                  required
                />
              </div>
              {errors.name && (
                <div className="text-sm text-red-600">
                  * Enter valid name(min 3 chars)
                </div>
              )}
            </div>

            {/* Username */}
            <div className="mb-6">
              <label className="block font-semibold mb-2">Username</label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <UserIcon className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  {...register("user_name", { required: true, minLength: 3 })}
                  className="block dark:bg-slate-800 w-full pl-12 p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100"
                  type="text"
                  placeholder="username"
                  required
                />
              </div>
              {errors.user_name && (
                <div className="text-sm text-red-600">
                  * Enter valid username(min 3 chars)
                </div>
              )}
            </div>

            {/* Email */}
            <div className="mb-6">
              <label className="block font-semibold mb-2">Email</label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <MailIcon className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  {...register("email", {
                    required: true,
                    validate: validateEmail,
                  })}
                  className="block dark:bg-slate-800 w-full pl-12 p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100"
                  type="text"
                  placeholder="email"
                  required
                />
              </div>
              {errors.email && (
                <div className="text-sm text-red-600">
                  * Enter a valid email
                </div>
              )}
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block font-semibold mb-2">Password</label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  {...register("password", { required: true, minLength: 6 })}
                  className="block dark:bg-slate-800 w-full pl-12 p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100"
                  type="password"
                  placeholder="password"
                  required
                />
              </div>
              {errors.password && (
                <div className="text-sm text-red-600">
                  * Enter valid password(min 6 chars)
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <label className="block font-semibold mb-2">
                Confirm Password
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  {...register("password", { required: true, minLength: 6 })}
                  className="block dark:bg-slate-800 w-full pl-12 p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100"
                  type="password"
                  placeholder="confirm password"
                  required
                />
              </div>
              {errors.confirm_password && (
                <div className="text-sm text-red-600">
                  * Passwords must match
                </div>
              )}
            </div>

            {/* Gender */}
            <div className="mb-6">
              <label className="block font-semibold mb-2">Gender</label>
              <div className="relative mt-1">
                <select
                  {...register("gender", { required: true })}
                  className="block dark:bg-slate-800 w-full pl-4 p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100"
                >
                  <option value="">Select gender</option>
                  <option value="male"> Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              {errors.gender && (
                <div className="text-sm text-red-600">
                  * Please select a gender
                </div>
              )}
            </div>

            {/* File Upload */}
            <div className="mb-6">
              <label className="block font-semibold mb-2">
                Upload a profile picture
              </label>
              <input className="dark:bg-slate-800 "  onChange={handleImageChange} ref={uploadRef} type="file" />
            </div>

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Image Preview"
                className="my-2 rounded-md shadow-md"
              />
            )}
            {/* Description */}
            <div className="mb-6">
              <label className="block font-semibold mb-2">Description</label>
              <div className="relative mt-1">
                <textarea
                  {...register("desc", { maxLength: 255 })}
                  className="block dark:bg-slate-800 w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100"
                  placeholder="Write about yourself..."
                ></textarea>
              </div>
              {errors.description && (
                <div className="text-sm text-red-600">
                  * Maximum length exceeded
                </div>
              )}
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-3 font-semibold text-white bg-indigo-500 rounded-lg transition duration-300 hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              >
                Create Account
              </button>
            </div>
          </form>

          <div className="mt-6 text-gray-700">
            <p className="inline">Already have an account? </p>
            <Link
              to="/signin"
              className="font-semibold text-indigo-500 hover:text-indigo-600"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
