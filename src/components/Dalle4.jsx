import { CameraIcon } from "@heroicons/react/solid";

import download from "downloadjs";
import React, { useState } from "react";
import { URL, doApiMethod } from "../services/apiService";

const Dalle4 = ({ setShowImgAi }) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState([]);
  const [value, setValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      getImages();
    }
  };

  const getImages = async () => {
    try {
      setLoading(true);
      const url = URL + "/dalle";
      const data = await doApiMethod(url, "POST", { prompt: value });
      // console.log(data);

      // Assuming data is your array with the b64_json property
      if (data && data.length > 0) {
        setImage(data[0].b64_json);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const downloadImg = () => {
    // Convert base64 data to blob for downloading
    const byteCharacters = atob(image);
    const byteNumbers = Array.prototype.slice
      .call(byteCharacters)
      .map((char) => char.charCodeAt(0));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/png" });

    // Use downloadjs library to trigger the download
    download(blob, "generated_image.png");
  };

  const handleOverlayClick = (event) => {
    if (event.target.classList.contains("bg-black")) {
      setShowImgAi(false);
    }
  };

  class TImages {
    static decodeJsonToFile(path) {
      let listDecodedImage = this.extractImageMeta();
      let result = new Array(listDecodedImage.length);

      for (let i = 0; i < listDecodedImage.length; i++) {
        let decodedImage = listDecodedImage[i];
        result[i] = path + decodedImage.fileName;
        this.decodeToFile(decodedImage.b64Json, path + decodedImage.fileName);
      }

      return result;
    }

    static extractImageMeta() {
      // You'll need to implement this function or provide its behavior
      return [];
    }

    static decodeToFile(b64Json, fileName) {
      // You'll need to implement this function or provide its behavior
    }
  }

  // Usage
  let imagesArray = TImages.decodeJsonToFile("/path/to/directory/");

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed z-50 inset-0 flex justify-center items-center bg-black bg-opacity-90"
    >
      <div className="flex flex-col dark:bg-slate-900 items-center justify-center flex-1 max-w-md px-4 py-8 mx-auto bg-white shadow-xl rounded-xl">
        {" "}
        <h1 className="text-center font-bold text-2xl mb-6">
          Vibes AI Image Generator
        </h1>
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <CameraIcon className="w-5 h-5 text-gray-500" />
          </div>
          <input
            className="block w-full pl-12 pr-4 py-2 border dark:border-slate-700 dark:bg-slate-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100" // Enhanced input
            type="text"
            name="input"
            placeholder="type your prompt here..."
            required
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            value={value}
          />
        </div>
        <button
          onClick={getImages}
          className="w-full py-3 mb-6 font-semibold text-white bg-indigo-500 rounded-lg transition duration-300 hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-400 focus:outline-none" // Enhanced button with transition
          type="submit"
        >
          {loading ? "Loading..." : "Generate"}
        </button>
        {!loading && image.length > 0 && (
          <div className="mb-4">
            <img
              src={`data:image/png;base64,${image}`}
              alt={`generated img`}
              className="mb-4 rounded shadow-md"
            />
            <button
              className="w-full py-3 font-semibold bg-indigo-500 rounded-lg transition duration-300 hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-400 focus:outline-none" // Same enhanced button style
              onClick={downloadImg}
            >
              Download Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dalle4;
