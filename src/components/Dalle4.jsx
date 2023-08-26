import { CameraIcon } from "@heroicons/react/solid";

import download from "downloadjs";
import React, { useState } from "react";
import { URL, doApiMethod } from "../services/apiService";

const Dalle4 = ({ setShowImgAi }) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState([]);
  const [value, setValue] = useState("");

  const getImages = async () => {
    try {
      setLoading(true);
      const url = URL + "/dalle";
      const data = await doApiMethod(url, "POST", { prompt: value });
      setImage(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const downloadImg = () => {
    download(image[0].url);
  };

  const handleOverlayClick = (event) => {
    if (event.target.classList.contains("bg-black")) {
      setShowImgAi(false);
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed z-50 inset-0 flex justify-center items-center bg-black bg-opacity-80"
    >
      <div className="flex flex-col items-center justify-center flex-1 max-w-sm px-2 mx-auto">
        <div className="w-full py-4 px-7 rounded-lg bg-white border">
          <h1 className="text-center font-semibold pb-2 text-lg">
            Vibes AI Image Generator
          </h1>

          <div className="relative p-1 mt-2 rounded-md ">
            <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
              <CameraIcon className="w-5 h-5 text-gray-500" />
            </div>
            <input
              className="block w-full pl-10 border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm bg-gray-50"
              type="text"
              name="input"
              placeholder="type your prompt here..."
              required
              onChange={(e) => setValue(e.target.value)}
              value={value}
            />
          </div>
          <button
            onClick={getImages}
            className="w-full py-3 my-1 mt-2 font-semibold text-center text-white bg-blue-500 rounded hover:bg-blue-600"
            type="submit"
          >
            {loading ? "Loading..." : "Generate"}
          </button>
          <div>
            {!loading && image.length > 0 && (
              <div className="mb-4">
                <img
                  src={image[0].url}
                  alt={`generated img`}
                  className="mb-2"
                />
                <button
                  className="w-full py-2 font-semibold text-center text-white bg-blue-500 rounded hover:bg-blue-600"
                  onClick={downloadImg}
                >
                  Download Image
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dalle4;
