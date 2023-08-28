import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TOKEN_KEY, URL, doApiGet } from "../services/apiService";

export const useUserData = () => {
  // const {setIsLoading} = useContext(MyContext);
  const [userData, setUserData] = useState({});

  const doApiUser = async () => {
    const url = URL + "/users/userInfo";
    const data = await doApiGet(url);
    setUserData(data);
  };

  useEffect(() => {
    if (localStorage[TOKEN_KEY]) {
      doApiUser();
    }
  }, []);

  // useEffect(() => {
  //   const checkTokenExpiry = () => {
  //     const tokenExpiration = localStorage.tokenExpiration;
  //     if (tokenExpiration) {
  //       const currentTime = new Date().getTime();
  //       const expirationTime = parseInt(tokenExpiration);
  //       //console.log(currentTime + " current time");
  //       //console.log(expirationTime + " expiration");
  //       if (currentTime > expirationTime) {
  //         alert("You have been logged out, please login again");
  //         deleteToken();
  //       }
  //     }

  //     // Schedule the next check after a certain interval (e.g., every minute)
  //     setTimeout(checkTokenExpiry, 60000); // Check every minute
  //   };

  //   // Start the initial check
  //   checkTokenExpiry();
  // }, []);

  const userSignOut = () => {
    if (window.confirm("Are you sure you want to log out")) {
      deleteToken();
    }
  };

  const deleteToken = async () => {
    try {
      // setIsLoading(true);
      await localStorage.removeItem(TOKEN_KEY); // Remove the token from localStorage
      await localStorage.removeItem("tokenExpiration"); // Remove the token expiration time
      toast.info("You logged out, see you soon...");
      setUserData({});
      window.location.href = "/signin";
      // setIsLoading(false);
    } catch (error) {
      console.error("Error deleting token:", error);
    }
  };

  return { userData, doApiUser, userSignOut, setUserData };
};
