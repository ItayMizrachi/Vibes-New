import { SearchIcon } from "@heroicons/react/outline";
import { Card, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { URL, doApiGet, doApiMethod } from "../services/apiService";
import PagesBtns from "./PagesBtns";

const CommentsAdmin = () => {
    const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query
    const [searchResults, setSearchResults] = useState([]); // State to hold the search results
    const [query] = useSearchParams();
    const [ar, setAr] = useState([]);
    const HEAD = ["#", "User_name", "Name", "Text", "_id", "Post_id", "Delete"];

    useEffect(() => {
        if (searchQuery) {
            searchComments();
        } else {
            // If search query is empty, fetch all comments
            doApi();
        }
    }, [query, searchQuery]);

    const doApi = async () => {
        const page = query.get("page") || 1;

        const url = URL + "/comments/get/commentsList?page=" + page;
        try {
            const data = await doApiGet(url);
            console.log(data);
            setAr(data);
        } catch (error) {
            console.log(error);
        }
    };

    const searchComments = async () => {
        try {
            const url = `${URL}/comments/search/search?s=${searchQuery}`;
            const data = await doApiGet(url);
            setSearchResults(data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteComment = async (_id) => {
        if (window.confirm("Are you sure you want to delete?")) {
            try {
                const url = `${URL}/comments/${_id}`;
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
            <h1 className="text-center  text-4xl font-bold text-blue-500 m-3">Comments List</h1>
            <div className="m-2 my-6 flex items-center">
                <PagesBtns
                    apiUrl={URL + "/comments/count/count"}
                    linkTo={"/admin/comments?page="} />


                <div className="relative mt-1 mx-3">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <SearchIcon className="w-5 h-5 text-gray-500" />
                    </div>
                    <input
                        className="block w-auto pl-12 pr-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100" // Enhanced input style
                        type="text"
                        placeholder="Search comments"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
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
                        {searchQuery && searchResults.length > 0
                            ? searchResults.map((item, i) => {
                                const page = query.get("page") || 1;
                                return (
                                    <tr key={i + 1} className="even:bg-blue-gray-50/50 hover:bg-gray-100">
                                        <td className="p-6">
                                            <Typography variant="h5" color="blue-gray" className="font-normal">
                                                {(page - 1) * 10 + i + 1}
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
                                                {item.text}
                                            </Typography>
                                        </td>
                                        <td className="p-6">
                                            <Typography variant="h5" color="blue-gray" className="font-normal">
                                                {item._id}
                                            </Typography>
                                        </td>
                                        <td className="p-6">
                                            <Typography variant="h5" color="blue-gray" className="font-normal">
                                                {item.post_id}
                                            </Typography>
                                        </td>
                                        <td className="p-6">
                                            <button
                                                onClick={() => {
                                                    deleteComment(item._id);
                                                }}
                                                className=" transition-all duration-150 ease-out cursor-pointer bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                            >
                                                DEL
                                            </button>
                                        </td>

                                    </tr>
                                );
                            })
                            : ar.map((item, i) => {
                                const page = query.get("page") || 1;
                                return (
                                    <tr key={i + 1} className="even:bg-blue-gray-50/50 hover:bg-gray-100">
                                        <td className="p-6">
                                            <Typography variant="h5" color="blue-gray" className="font-normal">
                                                {(page - 1) * 10 + i + 1}
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
                                                {item.text}
                                            </Typography>
                                        </td>
                                        <td className="p-6">
                                            <Typography variant="h5" color="blue-gray" className="font-normal">
                                                {item._id}
                                            </Typography>
                                        </td>
                                        <td className="p-6">
                                            <Typography variant="h5" color="blue-gray" className="font-normal">
                                                {item.post_id}
                                            </Typography>
                                        </td>
                                        <td className="p-6">
                                            <button
                                                onClick={() => {
                                                    deleteComment(item._id);
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

export default CommentsAdmin;
