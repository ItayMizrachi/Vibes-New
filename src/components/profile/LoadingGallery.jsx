const LoadingGallery = () => {
  const elements = [];

  // Using a for loop to generate the JSX 9 times
  for (let i = 0; i < 9; i++) {
    elements.push(
      <div
        key={i} // Make sure to provide a unique key for each element when rendering in a loop
        role="status"
        className="flex items-center justify-center h-96 max-w-sm w-full bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
      ></div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 mt-7">
      {elements}
    </div>
  );
};

export default LoadingGallery;
