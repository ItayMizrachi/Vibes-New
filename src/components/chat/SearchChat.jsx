import React, { useEffect, useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { URL, doApiGet } from "../../services/apiService";

const SearchChat = ({ startNewChat, user_id, setShowSearch }) => {
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
      />
    </div>
  );
};

export default SearchChat;
