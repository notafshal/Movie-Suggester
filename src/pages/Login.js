import axios from "axios";
import { useRef } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const history = useHistory();

  const loginHandler = async (e) => {
    e.preventDefault();
    const loginData = {
      email: email.current.value,
      password: password.current.value,
    };
    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/login",
        loginData,
        {
          timeout: 10000,
        }
      );
      // alert(response.data.message);
      const getAccessToken = response.data.accessToken;
      localStorage.setItem("accessToken", getAccessToken);
      if (response.data.status === "success") {
        alert("You are Logged in");
      }

      history.replace("/");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.errors[0].message);
      } else {
        alert("Unknown error occured!! Try again");
      }
    }
  };
  return (
    <>
      <form onSubmit={loginHandler}>
        Email:
        <br /> <input type="text" ref={email} />
        <br />
        Password:
        <br />
        <input type="password" ref={password} />
        <br />
        <button>Login</button>
        <br />
      </form>
    </>
  );
};
export default Login;
