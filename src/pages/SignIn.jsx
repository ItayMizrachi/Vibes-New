import { LockClosedIcon, UserIcon } from "@heroicons/react/solid";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MyContext } from "../context/myContext";
import { EXP_DATE_KEY, TOKEN_KEY, URL, doApiMethod } from "../services/apiService";

const SignIn = () => {
  const {setIsLoading} = useContext(MyContext);
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubForm = (_bodyData) => {
    doApiPost(_bodyData);
  };

/**
 * Perform a POST request to the login endpoint with user credentials.
 * If successful, extract and store the token along with its expiration information.
 * @param {object} _bodyData - The user's login credentials.
 */
const doApiPost = async (_bodyData) => {
  try {
    setIsLoading(true)
    const url = URL + "/users/login";
    const data = await doApiMethod(url, "POST", _bodyData);
    if (data.token) {
      // Extract the token's payload to get the expiration date
      const tokenPayload = JSON.parse(atob(data.token.split(".")[1]));
      const expirationDate = new Date(tokenPayload.exp * 1000);
      // Store the token and its expiration date in local storage
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(EXP_DATE_KEY, data.expDate);
      localStorage.setItem("tokenExpiration", expirationDate.getTime());
      toast.success("Welcome, you logged in.");
      nav("/");
      window.location.reload();
      setIsLoading(false)
    }
  } catch (err) {
    // Log any errors to the console
    console.log(err);

    // Display an error message to the user
    toast.error("User or password is wrong!");
  }
};

  return (
    <div className="mt-5 bg-grey-lighter lg:mt-20">
      <div className="container flex flex-col items-center justify-center flex-1 max-w-sm px-2 mx-auto">
        <div className="w-full px-6 py-8 text-black bg-white rounded shadow-md">
          <h1 className="mb-8 text-3xl font-semibold text-center ">Sign In</h1>

          <form onSubmit={handleSubmit(onSubForm)}>
            <div className="relative p-1 mt-1 rounded-md lg:mt-4">
              <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                <UserIcon className="w-5 h-5 text-gray-500" />
              </div>
              <input
                {...register("user_name", { required: true, minLength: 2 })}
                className="block w-full pl-10 border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm bg-gray-50"
                type="text"
                placeholder="username"
                required
              />{" "}
            </div>
            {errors.user_name && (
              <div className="text-red-700 ">
                * Enter valid username(min 3 chars)
              </div>
            )}

            <div className="relative p-1 mt-2 rounded-md ">
              <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                <LockClosedIcon className="w-5 h-5 text-gray-500" />
              </div>
              <input
                {...register("password", { required: true, minLength: 6 })}
                className="block w-full pl-10 border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm bg-gray-50"
                type="password"
                placeholder="password"
                required
              />
            </div>
            {errors.password && (
              <div className="text-red-700 ">
                * Enter valid password (min 6 chars)
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 my-1 mt-2 font-semibold text-center text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Login
            </button>
          </form>
        </div>

        <div className="mt-6 text-grey-dark">
          <p className="inline"> Don't have an account? </p>
          <Link to="/signup" className="font-semibold text-blue-500">
            sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
