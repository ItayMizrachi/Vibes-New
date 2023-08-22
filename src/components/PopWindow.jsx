import React from 'react';
import { Link } from "react-router-dom";
import { XIcon } from "@heroicons/react/outline";

const PopWindow = ({ onClose }) => {




    const handleOverlayClick = (event) => {
        if (event.target.classList.contains("bg-black")) {
            onClose();
        }
    };


    return (
        <div
            className="fixed z-50 inset-0 flex justify-center items-center bg-black bg-opacity-80"
            onClick={handleOverlayClick}
        >
            <div className="bg-white rounded-lg w-[300px]">
                <div className=" p-4 border-b relative text-center">
                    <XIcon className="w-5 h-5 cursor-pointer absolute top-2 right-2"
                        onClick={onClose}> </XIcon>
                    <p className="text-lg font-semibold mb-4">Choose an option:</p>
                    <Link to={"/edit_user"} >
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2">
                            Upload New Picture
                        </button>

                    </Link>
                    <button className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2">
                        Open Picture
                    </button>

                </div>
            </div >
        </div >
    );

};


export default PopWindow;
