import { Card, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { URL, doApiGet, doApiMethod } from "../services/apiService";
import PagesBtns from "./PagesBtns";

const PostsAdmin = () => {
  const [query] = useSearchParams();
  const [ar, setAr] = useState([]);
  const HEAD = ["#", "User_name", "Name", "Desc", "_id", "Delete"];

  useEffect(() => {
    doApi();
  }, [query]);

  const doApi = async () => {
    const page = query.get("page") || 1;
    const url = URL + "/userPosts/postsList?page=" + page;
    try {
      const data = await doApiGet(url);
      console.log(data);
      setAr(data);
    } catch (error) {
      console.log(error);
    }
  };


  const deletePost = async (_id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        const url = `${URL}/userPosts/${_id}`;
        const data = await doApiMethod(url, "DELETE");

        if (data.deletedCount) {
          doApi();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="container mx-auto mt-20">
      <h1 className="text-center  text-4xl font-bold text-blue-500 m-3">Posts List</h1>
      <div className="m-2 my-6">
        <PagesBtns
          apiUrl={URL + "/userPosts/count"}
          linkTo={"/admin/posts?page="} />
      </div>
      <hr></hr>
      <Card className="h-full w-full overflow-y-auto scrollbar-thin scrollbar-thumb-black">
        <table className="w-full min-w-max table-auto text-left">
          <thead className="shadow-md">
            <tr>
              {HEAD.map((head) => (
                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ar.map((item, i) => {
              const page = query.get("page") || 1;
              return (
                <tr key={i + 1} className="even:bg-blue-gray-50/50 hover:bg-gray-100">
                  <td className="p-6">
                    <Typography variant="h5" color="blue-gray" className="font-normal">
                      {(page - 1) * 15 + i + 1}
                    </Typography>
                  </td>
                  <td className="p-6">
                    <Typography variant="h5" color="blue-gray" className="font-normal">
                      {item.user?.user_name}
                    </Typography>
                  </td>
                  <td className="p-6">
                    <Typography variant="h5" color="blue-gray" className="font-normal">
                      {item.user?.name}
                    </Typography>
                  </td>
                  <td className="p-6">
                    <Typography variant="h5" color="blue-gray" className="font-normal">
                      {item.description}
                    </Typography>
                  </td>
                  <td className="p-6">
                    <Typography variant="h5" color="blue-gray" className="font-normal">
                      {item._id}
                    </Typography>
                  </td>
                  <td className="p-6">
                    <button
                      onClick={() => {
                        deletePost(item._id);
                      }}
                      className=" transition-all duration-150 ease-out cursor-pointer bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      DEL
                    </button>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default PostsAdmin;
