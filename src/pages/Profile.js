import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const history = useHistory();
  useEffect(() => {
    getProfile();
  }, []);
  const getProfile = async () => {
    const getAccessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        "https://api.dynoacademy.com/test-api/v1/me",

        {
          timeout: 10000,
          headers: {
            Authorization: `Bearer ${getAccessToken} `,
          },
        }
      );
      setUserData(response.data.data);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.errors[0].message);
      } else {
        alert("Unknown error occured!! Try again");
      }
      alert(error.response.data.errors[0].message);
    }
  };
  const onLogout = () => {
    localStorage.removeItem("accessToken");
    history.push("/");
  };

  return (
    <>
      <Link to="/">Home</Link>
      <br />
      <br />
      Name: {userData.name}
      <br />
      Email: {userData.email}
      <br />
      Country: {userData.country}
      <br />
      <button onClick={onLogout}>Logout</button>
    </>
  );
};
export default Profile;
