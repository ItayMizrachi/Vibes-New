import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PagesBtns = (props) => {
  const [pages, setPages] = useState(0);
  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    try {
      const resp = await axios.get(props.apiUrl);
      console.log(resp.data);
      setPages(resp.data.pages);
    } catch (error) {
      console.log(err);
    }
  };
  return (
    <div>
      <strong> <span>Page: </span></strong>
      {[...Array(pages)].map((item, i) => {
        return (
          <Link key={i} to={props.linkTo + (i + 1)} className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-1.5 px-3 rounded-full mr-2">
            {i + 1}
          </Link>
        );
      })}
    </div>
  );
};

export default PagesBtns;
