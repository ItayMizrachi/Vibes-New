import { ChatIcon, HeartIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import Lightbox from "react-spring-lightbox";

const Gallery = ({ postsInfo, Intersector }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentIndex] = useState(null);

  const gotoPrevious = () => {
    if (currentImageIndex > 0) {
      setCurrentIndex(currentImageIndex - 1);
    } else {
      setCurrentIndex(postsInfo.length - 1); // Loop to the last image when at the beginning
    }
  };

  const gotoNext = () => {
    if (currentImageIndex < postsInfo.length - 1) {
      setCurrentIndex(currentImageIndex + 1);
    } else {
      setCurrentIndex(0); // Loop to the first image when at the end
    }
  };
  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        {postsInfo.map((post, index) => (
          <div
            onClick={() => {
              setCurrentIndex(index);
              setIsOpen(true);
            }}
            key={post._id}
            className="relative cursor-pointer group"
          >
            <div className="overflow-hidden ">
              <>
                <img
                  className="object-cover w-full h-96 "
                  src={post.img_url}
                  alt="post"
                />
              </>
            </div>
            <div className="absolute top-0 flex items-center justify-center w-full h-full text-white -translate-x-1/2 opacity-0 group-hover:opacity-100 left-1/2 bg-black-rgba">
              <div className="mr-3 space-x-1">
                <HeartIcon className="inline h-6" />
                <span className="font-semibold">{post.likes.length}</span>
              </div>
              <div className="space-x-1">
                <ChatIcon className="inline h-6" />
                <span className="font-semibold">5</span>
              </div>
            </div>
          </div>
        ))}
        {/* <Intersector /> */}
      </div>
      {/* Lightbox */}

      <Lightbox
        isOpen={isOpen}
        onPrev={gotoPrevious}
        onNext={gotoNext}
        images={postsInfo.map((post) => ({
          src: post.img_url,
          alt: "post",
        }))}
        currentIndex={currentImageIndex}
        // renderPrevButton={() => (
        //   <ArrowLeftIcon onClick={gotoPrevious} className="btn" />
        // )}
        // renderNextButton={() => (
        //   <ArrowRightIcon onClick={gotoNext} className="btn" />
        // )}
        //  renderImageOverlay={() => (<ImageOverlayComponent >)}

        /* Add styling */
        className=" bg-black-rgba/80"
        //style={{ background: "grey" }}

        /* Handle closing */
        onClose={() => setIsOpen(false)}
        /* Use single or double click to zoom */
        // singleClickToZoom

        /* react-spring config for open/close animation */
        pageTransitionConfig={{
          from: { transform: "scale(0.75)", opacity: 0 },
          enter: { transform: "scale(1)", opacity: 1 },
          leave: { transform: "scale(0.75)", opacity: 0 },
          config: { mass: 1, tension: 320, friction: 32 },
        }}
      />
    </>
  );
};

export default Gallery;
