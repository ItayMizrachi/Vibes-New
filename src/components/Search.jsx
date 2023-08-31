import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { URL, doApiGet } from "../services/apiService";
import { useContext } from "react";
import { MyContext } from "../context/myContext";

const Search = () => {
  const [userNames, setUserNames] = useState([]);
  const nav = useNavigate();
  const { darkMode } = useContext(MyContext);

  const handleOnSelect = (item) => {
    // the item selected
    nav(`/${item.user_name}`);
  };

  const doApiUserNames = async () => {
    try {
      const url = URL + "/users/usersNamesList";
      const data = await doApiGet(url);
      setUserNames(data);
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    doApiUserNames();
  }, []);

  const formatResult = (item) => {
    return (
      <span style={{ display: "block", textAlign: "left" }}>
        {item.user_name}
      </span>
    );
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
        styling={{
          backgroundColor: darkMode && "#0f172a",
          color: darkMode && "rgb(229 231 235 / var(--tw-text-opacity))",
          lineColor: darkMode && "#1e293b",
          border: darkMode ? "#334155 solid 1px" : "#e5e7eb solid 1px",
          hoverBackgroundColor: "#1e293b",
          placeholderColor: "#1e293",
          outline: "rgb(229 231 235 / var(--tw-text-opacity))",
        }}
      />
    </div>
  );
};

export default Search;


