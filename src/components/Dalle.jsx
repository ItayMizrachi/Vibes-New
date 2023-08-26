import { CameraIcon } from "@heroicons/react/solid";
import FileSaver, { saveAs } from "file-saver";

import React, { useState } from "react";
import { URL as URL2 } from "../services/apiService";

const Dalle = ({ setShowImgAi }) => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [value, setValue] = useState("");

  const getImages2 = async () => {
    try {
      setLoading(true);
      const options = {
        method: "POST",
        body: JSON.stringify({ prompt: value }),
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await fetch(URL2 + "/dalle", options);
      //   const data = await response.json();
      const blob = await response.blob();
      console.log(blob);
      setImages(URL.createObjectURL(blob));
      console.log(images);
      //   setImages(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getImages = async () => {
    try {
      setLoading(true);
      const options = {
        method: "POST",
        body: JSON.stringify({ prompt: value }),
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await fetch(URL2 + "/dalle", options);
      const data = await response.json();
      setImages(data); // As the result should be an array of URLs, wrap it in an array
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownload3 = (image) => {
    saveAs(image, "image.png");
    console.log(saveAs);
};

const handleDownload1 = (image) => {
  saveAs(image, "image.png");
};


const handleDownload2 = (image) => {
      FileSaver.saveAs(image, "image.png");
    var canvas = document.getElementById(image);
    canvas.toBlob(function(image) {
        saveAs(image, "pretty image.png");
    });
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
            {!loading &&
              images.length > 0 &&
              images.map((img, index) => (
                <div key={index} className="mb-4">
                  <img
                    src={img.url}
                    alt={`generated img ${index}`}
                    className="mb-2"
                  />
                  <button
                    className="w-full py-2 font-semibold text-center text-white bg-blue-500 rounded hover:bg-blue-600"
                    onClick={() => handleDownload1(img.url)}
                  >
                    Download Image
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dalle;
