import { XIcon } from "@heroicons/react/outline";
import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { MyContext } from "../context/myContext";
import { URL, doApiMethod, imgToString } from "../services/apiService";

const EditProfilePic = ({ onClose }) => {
    const [isLoading, setIsLoading] = useState(false); // Add state for loading
    const { userData } = useContext(MyContext);

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
            className="fixed inset-0 flex z-50 justify-center items-center bg-black bg-opacity-80"
        >
            <div className="flex flex-col items-center justify-center flex-1 max-w-sm px-2 mx-auto">
                <div className="w-full px-6 py-4 rounded-lg bg-white">
                    <div className="flex justify-between items-center p-3 border-b">
                        <h2 className="text-xl font-semibold">Edit Profile pic </h2>
                        <XIcon
                            onClick={onClose}
                            className="h-5 w-5 cursor-pointer"
                        />
                    </div>

                    <form onSubmit={handleSubmit(onSubForm)}>

                        <div className="mb-4">
                            <label className="font-semibold">Upload image</label>
                            <input
                                required
                                ref={uploadRef}
                                onChange={handleImageChange}
                                type="file"
                                className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500 upload"
                            />
                        </div>

                        <div className="mb-4 mt-4">
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Image Preview"
                                    className="my-2 rounded-md"
                                />
                            )}
                        </div>
                        <button
                            type="submit"
                            className={`w-full py-3 mt-4 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                            disabled={isLoading}
                        >
                            {isLoading ? "Loading..." : "Change Profile Pic"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfilePic;