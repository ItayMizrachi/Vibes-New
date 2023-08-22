import { useState } from "react";
import { URL, doApiMethod } from "../services/apiService";
import { useUserData } from "./useUserData";

export const useFollow = () => {
  const [followFlag, setFollowFlag] = useState(false);
  const { userData } = useUserData();

  const createFollowNotification = async (userId, senderId) => {
    try {
      const url = URL + "/notifications/follow";
      const body = { userId, senderId };
      await doApiMethod(url, "POST", body);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFollowNotification = async (recieverId, senderId) => {
    try {
      const url = URL + `/notifications/follow/${recieverId}/${senderId}`;
      await doApiMethod(url, "DELETE");
      // console.log("Success");
    } catch (error) {
      console.log(error);
    }
  };

  const followUser = async (otherUser_id) => {
    try {
      if (otherUser_id._id !== userData?._id) {
        const url = URL + "/users/follow/" + otherUser_id;
        await doApiMethod(url, "PUT");
        setFollowFlag(!followFlag);

        // Create or delete follow notification based on follow/unfollow action
        if (!followFlag) {
          await createFollowNotification(otherUser_id, userData._id);
        } else deleteFollowNotification(otherUser_id, userData._id);
        console.log("Successfully created");
      }
    } catch (error) {
      console.log(error);
    }
  };




  // const followUser = async (otherUser_id) => {
  //   try {
  //     if (otherUser_id._id !== userData?._id) {
  //       const url = URL + "/users/follow/" + otherUser_id;
  //       await doApiMethod(url, "PUT");
  //       setFollowFlag(!followFlag);
  //       //console.log(flag);
  //       await createFollowNotification(otherUser_id, userData._id);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return { followUser, followFlag };
};
