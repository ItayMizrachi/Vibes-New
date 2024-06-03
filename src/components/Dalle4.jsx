import { CameraIcon, XIcon } from "@heroicons/react/solid";
import download from "downloadjs";
import React, { useState } from "react";
import { URL, doApiMethod } from "../services/apiService";

const Dalle4 = ({ setShowImgAi }) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState([]);
  const [value, setValue] = useState("");
  const [error, setError] = useState(""); // State for error message

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      getImages();
    }
  };

  const getImages = async () => {
    try {
      setLoading(true);
      setError(""); // Clear previous errors
      const url = URL + "/dalle";
      const data = await doApiMethod(url, "POST", { prompt: value });

      if (data && data.length > 0) {
        setImage(data[0].b64_json);
      } else {
        setError("No images returned. Try again later."); // Handle no data case
      }
    } catch (error) {
      setError("An error occurred. Please try again later."); // Set error message
    } finally {
      setLoading(false);
    }
  };

  const downloadImg = () => {
    const byteCharacters = atob(image);
    const byteNumbers = Array.prototype.slice
      .call(byteCharacters)
      .map((char) => char.charCodeAt(0));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/png" });

    download(blob, "generated_image.png");
  };

  const handleOverlayClick = (event) => {
    if (event.target.classList.contains("bg-black")) {
      setShowImgAi(false);
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed z-50 inset-0 flex justify-center items-center bg-black bg-opacity-90"
    >
      <div className="flex flex-col dark:bg-slate-900 items-center justify-center flex-1 max-w-md px-4 py-8 mx-auto bg-white shadow-xl rounded-xl">
        <XIcon
          onClick={() => setShowImgAi(false)}
          className="h-6 w-6 ml-auto flex-inline md:hidden -top-3 relative text-end cursor-pointer hover:text-gray-600 transition-colors duration-200"
        />
        <h1 className="text-center mb-6 font-bold text-2xl ">
          Vibes AI Image Generator
        </h1>
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <CameraIcon className="w-5 h-5 text-gray-500" />
          </div>
          <input
            className="block w-full pl-12 pr-4 py-2 border dark:border-slate-700 dark:bg-slate-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
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
          disabled={value === ""}
          onClick={getImages}
          className="w-full py-3 mb-6 font-semibold text-white disabled:dark:bg-gray-800 disabled:bg-gray-400/60 disabled:cursor-not-allowed bg-indigo-500 active:scale-95 transform rounded-lg transition duration-300 hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          type="submit"
        >
          {loading ? "Loading..." : "Generate"}
        </button>
        {error && <div className="text-red-500 mb-4">{error}</div>}{" "}
        {/* Error message */}
        {!loading && image.length > 0 && (
          <div className="mb-4">
            <img
              src={`data:image/png;base64,${image}`}
              alt={`generated img`}
              className="mb-4 rounded shadow-md"
            />
            <button
              className="w-full py-3 font-semibold bg-indigo-500 active:scale-95 transform rounded-lg transition duration-300 hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
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
