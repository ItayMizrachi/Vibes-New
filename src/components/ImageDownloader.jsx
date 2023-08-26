import { CameraIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { URL as URL2 } from "../services/apiService";

function ImageDownloader({ setShowImgAi }) {
  const [images, setImages] = useState([]);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    try {
      const response = await fetch(URL2 + "/dalle", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ prompt: value }),
      });
      if (!response.ok) {
        throw new Error("Failed to generate image");
      }
      console.log(response);
      const blob = await response.blob();
      setImages([URL.createObjectURL(blob)]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };



  const downloadImg = (image) => {
    const link = document.createElement("a");
    link.href = image;
    link.download = "generated_image.png"; // Specify the desired filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
            onClick={fetchImages}
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
                    onClick={() => downloadImg(img.url)}
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
}

export default ImageDownloader;
