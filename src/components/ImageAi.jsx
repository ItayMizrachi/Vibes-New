import { CameraIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
// const API_TOKEN = "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";

const ImageAi = ({ setShowImgAi }) => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    // console.log(process.env.IMAGE_AI_KEY);
    const input = event.target.elements.input.value;
    const response = await fetch(
      "https://api-inference.huggingface.co/models/prompthero/openjourney",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_IMAGE_AI_KEY}`,
        },
        body: JSON.stringify({ inputs: input }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate image");
    }

    const blob = await response.blob();
    setOutput(URL.createObjectURL(blob));
    setLoading(false);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = output;
    link.download = "generated_image.jpg"; // Specify the desired filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOverlayClick = (event) => {
    // Check if the click occurred on the black overlay itself, not the content area
    if (event.target.classList.contains("bg-black")) {
      setShowImgAi(false);
    }
  };

  //check

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
          <form className="gen-form" onSubmit={handleSubmit}>
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
              />
            </div>
            <button
              className="w-full py-3 my-1 mt-2 font-semibold text-center text-white bg-blue-500 rounded hover:bg-blue-600"
              type="submit"
            >
              {loading ? "Loading..." : "Generate"}
            </button>
          </form>
          <div>
            {!loading && output && (
              <>
                <div className="result-image">
                  <img src={output} alt="art" />
                </div>
                <button
                  className="w-full py-3 my-1 mt-2 font-semibold text-center text-white bg-blue-500 rounded hover:bg-blue-600"
                  onClick={handleDownload}
                >
                  Download Image
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageAi;
