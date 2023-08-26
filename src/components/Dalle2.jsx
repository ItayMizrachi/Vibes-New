import { CameraIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { URL as URL2 } from "../services/apiService";

const Dalle2 = ({ setShowImgAi }) => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [value, setValue] = useState("");
  const [image, setImage] = useState(null);

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
      // setImage(`data:image/jpeg;base64,${data.image}`);
      setImage(data);
      console.log(data);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOverlayClick = (event) => {
    if (event.target.classList.contains("bg-black")) {
      setShowImgAi(false);
    }
  };

  const downloadImage2 = async (forceDownload = false) => {
    if (!forceDownload) {
      const link = document.createElement("a");
      link.href = image[0].url;
      link.download = "image.png"; // Specify the desired filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    // const imageBlob = await fetch(image).then((response) => response.blob());
    const imageBlob = await fetch(image)
      .then((response) => response.blob.arrayBuffer())
      .then((buffer) => new Blob([buffer], { type: "image/png" }));

    const link = document.createElement("a");
    link.href = URL.createObjectURL(imageBlob);
    link.download = "image.png"; // Specify the desired filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadImage = async (forceDownload = false) => {
    if (!forceDownload) {
      const link = document.createElement("a");
      link.href = image[0].url;
      link.download = "image.png"; // Specify the desired filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    // const imageBlob = await fetch(image).then((response) => response.blob());
    const imageBlob = await fetch(image[0].url)
      .then((response) => response.blob())
      .then((blob) => blob.arrayBuffer())
      .then((buffer) => new Blob([buffer], { type: "image/png" }));

    const link = document.createElement("a");
    link.href = URL.createObjectURL(imageBlob);
    link.download = "image.png"; // Specify the desired filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = image[0].url;
    link.download = "image.png"; // Specify the desired filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
            {!loading && image && (
              <div className="mb-4">
                <img
                  src={image[0].url}
                  alt={`generated img `}
                  className="mb-2"
                />
                <button
                  className="w-full py-2 font-semibold text-center text-white bg-blue-500 rounded hover:bg-blue-600"
                  onClick={downloadImage}
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

export default Dalle2;

{
  /* <a
className="w-full py-2 font-semibold text-center text-white bg-blue-500 rounded hover:bg-blue-600"
 href={img.url} download={"generated img " + index}
>
Download Image
</a> */
}

// const downloadImg = (image) => {
//   download(image);
// };

// const downloadImg2 = (image) => {
//   // Construct the image URL on your server
//   const serverImageUrl = `/images/${encodeURIComponent(image)}`;

//   // Download the image from your server
//   const link = document.createElement("a");
//   link.href = serverImageUrl;
//   link.download = image; // Use the actual filename
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };

