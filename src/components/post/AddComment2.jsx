import React, { useState } from "react";
import InputEmoji from "react-input-emoji";
import { TOKEN_KEY } from "../../services/apiService";

const AddComment2 = ({ onSubForm }) => {
  const [isInputFocused, setInputFocused] = useState(false);
  const [text, setText] = useState("");

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = () => {
    setInputFocused(false);
  };

  function handleOnEnter() {
    // Call the form submission function passed as a prop
    onSubForm({ text });
    setText(""); // Clear the input after submission
  }

  return (
    <>
      {localStorage[TOKEN_KEY] && (
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex items-center p-4"
        >
          <div className="w-full small-screen ">
            <InputEmoji
              value={text}
              onChange={setText}
              cleanOnEnter
              onEnter={handleOnEnter}
              placeholder="add a comment..."
              className="flex-1 border-none outline-none focus:ring-0 emoj"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </div>
          <button
            type="button"
            onClick={handleOnEnter}
            className={`font-semibold ${
              isInputFocused ? "text-indigo-500" : "text-indigo-400"
            }`}
          >
            Post
          </button>
        </form>
      )}
    </>
  );
};

export default AddComment2;
