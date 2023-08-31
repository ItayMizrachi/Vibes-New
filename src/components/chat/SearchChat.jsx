import React, { useEffect, useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { URL, doApiGet } from "../../services/apiService";
import { MyContext } from "../../context/myContext";
import { useContext } from "react";

const SearchChat = ({ startNewChat, user_id, setShowSearch }) => {
  const { darkMode } = useContext(MyContext);
  const [userNames, setUserNames] = useState([]);
  const handleOnSelect = (item) => {
    // Set the selected item and start new chat
    startNewChat([item.id, user_id]);
    setShowSearch(false);
  };

 

  const doApiUserNames = async () => {
    try {
      const url = URL + "/users/usersNamesList";
      const data = await doApiGet(url);
      setUserNames(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    doApiUserNames();
  }, []);

  const formatResult = (item) => {
    return <span style={{ display: "block", textAlign: "left" }}>{item.user_name}</span>;
  };

  return (
    <div className="md:w-[300px] w-[190px]">
      <ReactSearchAutocomplete
        className="react-search"
        items={userNames}
        autoFocus
        formatResult={formatResult}
        placeholder="Search User.."
        onSelect={handleOnSelect}
        fuseOptions={{ keys: ["user_name"], maxPatternLength: 3, distance: 1 }}
        resultStringKeyName="user_name"
        inputDebounce={200} // Set debounce time
        styling={{
          backgroundColor: darkMode ? "#0f172a" : "#fff",
          color: darkMode && "rgb(229 231 235 / var(--tw-text-opacity))",
          lineColor: darkMode && "#1e293b",
          border: darkMode ? "#334155 solid 1px" : "#e5e7eb solid 1px",
          hoverBackgroundColor: darkMode ? "#1e293b": "#e5e7eb",
          placeholderColor: "#1e293",
          outline: "rgb(229 231 235 / var(--tw-text-opacity))",
        }}
      />
    </div>
  );
};

export default SearchChat;
