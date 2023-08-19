import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { URL, doApiGet } from "../services/apiService";

const Search = () => {
  const [userNames, setUserNames] = useState([]);
  const nav = useNavigate();

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
        // styling={{
        //   backgroundColor: "gray",
        //   color: "#eee",
        //   lineColor: "rgb(205 20 20)",
        //   border: "10px solid #fff",
        //   outline: "none",
        // }}
      />
    </div>
  );
};

export default Search;
