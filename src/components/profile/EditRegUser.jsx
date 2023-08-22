import {
    PencilIcon,
    UserIcon,
} from "@heroicons/react/solid";

import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MyContext } from "../../context/myContext";
import { URL, doApiMethod } from "../../services/apiService";

const EditRegUser = () => {
    const { userData } = useContext(MyContext);
    const nav = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();




    const doApi = async (_bodyData) => {
        try {
            let url = URL + "/users/" + userData._id;
            const resp = await doApiMethod(url, "PUT", _bodyData);
            if (resp.modifiedCount) {
                toast.success("Edited user");
                nav("/" + userData.user_name)
            }

        } catch (err) {
            console.log(err);
            alert("There problem, come back later");
        }
    };




    const onSub = async (_bodyData) => {
        console.log(_bodyData);
        doApi(_bodyData);
    };

    const handleOverlayClick = (event) => {
        // Check if the click occurred on the black overlay itself, not the content area
        if (event.target.classList.contains("bg-black")) {
            setShowAddPost(false);
        }
    };

    return (
        <div onClick={handleOverlayClick}
            className="min-h-screen mt-5 lg:mt-20 bg-grey-lighter">
            <div className="container flex flex-col items-center justify-center flex-1 max-w-sm px-2 mx-auto">
                <div className="w-full px-6 py-8 text-black bg-white rounded shadow-md">
                    <h1 className="mb-8 text-3xl font-semibold text-center">Edit User</h1>

                    {userData && <form onSubmit={handleSubmit(onSub)}>
                        <div className="relative p-1 mt-1 rounded-md lg:mt-4">
                            <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                                <UserIcon className="w-5 h-5 text-gray-500" />
                            </div>
                            <input
                                className="block w-full pl-10 border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm bg-gray-50"
                                type="text"

                                placeholder={userData.name}
                                {...register("name", { required: false, minLength: 2 })}
                            />
                        </div>
                        {errors.name && (
                            <div className="text-red-600">*Enter valid name(min 2 chars)</div>
                        )}


                        <div className="relative p-1 mt-1 rounded-md lg:mt-4">
                            <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                                <UserIcon className="w-5 h-5 text-gray-500" />
                            </div>
                            <select
                                className="block w-full pl-10 border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm bg-gray-50"

                                {...register("gender", { required: false })}
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


                        <div className="relative p-1 mt-2 rounded-md">
                            <div className="absolute inset-y-0 flex p-3 pl-3 pointer-events-none">
                                {/* Use an icon for the textarea input */}
                                <PencilIcon className="w-5 h-5 text-gray-500" />
                            </div>
                            {/* Use the "textarea" element for the description field */}
                            <textarea
                                className="block w-full pl-10 border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm bg-gray-50"
                                rows="3"
                                placeholder={userData.desc}
                                {...register("desc", { required: false, minLength: 6 })}
                            />
                        </div>



                        <button
                            type="submit"
                            className="w-full py-3 my-1 mt-2 font-semibold text-center text-white bg-blue-500 rounded hover:bg-blue-600 bg-green hover:bg-green-dark focus:outline-none"
                        >
                            Edit user
                        </button>
                    </form>}
                </div>

            </div>
        </div>
    );
};

export default EditRegUser;