import { useState } from "react";


export const useShowNoftlications = () => {
  const [showNoftlications, setShowNoftlications] = useState(false);

  const toggleNoftlications = () => {
    setShowNoftlications(!showNoftlications);
  };

  // const [notifications, setNotifications] = useState([]);

  // const doApiNotifications = async () => {
  //   try {
  //     const url = URL + "/notifications/" + userData._id;
  //     const data = await doApiGet(url);
  //     setNotifications(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   doApiNotifications();
  //   console.log(notifications);
  // }, [showNoftlications]);


  return { showNoftlications, setShowNoftlications, toggleNoftlications };
};
