import { useEffect, useState } from "react";
import Textbox from "../components/Textbox";
import Passwordbox from "../components/Password";
import Buttons from "../components/Buttons";
import { authenticate, register } from "../api/authApi";
import { Navigate } from "react-router-dom";

export default function Register() {
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsVerified(false);
        return;
      }
      const user = await authenticate();
      if (!user.status || user.status === 401) {
        setIsVerified(false);
      } else {
        setIsVerified(true);
      }
    };
    checkAuth();
  }, []);

  const handleSignup = async () => {
    const password = (document.getElementById("pwdSignup") as HTMLInputElement)
      ?.value;
    const username = (document.getElementById("uName") as HTMLInputElement)
      ?.value;
    const email = (document.getElementById("emailSignup") as HTMLInputElement)
      ?.value;
    const phoneNumber = (
      document.getElementById("phoneNumber") as HTMLInputElement
    )?.value;

    const response = await register(username, email, password, phoneNumber);

    if (response) {
      localStorage.setItem("token", response.token);
      setIsVerified(true); // mark as verified so component will redirect
    }
  };

  // component-level return (was mistakenly inside handleSignup)
  return !isVerified ? (
    <div className="w-full h-screen flex py-[5%] px-[10%]">
      <div className="w-full h-full m-auto rounded-lg flex justify-between space-x-10 p-5 border border-gray-200 shadow-xl">
        <div className="w-[45%] lg:flex items-center justify-center hidden">
          <img
            src="thisartwork.jpg"
            className="w-full h-full object-cover rounded-lg hover:scale-102 transform duration-300"
          />
        </div>
        <div className="px-2 w-[45%] flex flex-col flex-grow h-full overflow-scroll">
          <h1 className="mb-4 mt-1 text-md font-bold">Create a new account</h1>
          <Textbox
            name="emailSignup"
            id="emailSignup"
            labelContent="Email"
            placeholder="Enter your email"
          />
          <Textbox
            name="uName"
            id="uName"
            labelContent="Username"
            placeholder="Enter your username"
          />
          <Textbox
            name="phoneNumber"
            id="phoneNumber"
            labelContent="Phone Number"
            placeholder="Enter your phone number"
          />
          <Passwordbox
            id="pwdSignup"
            name="pwdSignup"
            labelContent="Password"
            placeholder="Enter your password"
          />
          <Buttons
            buttonText="Sign up"
            buttonName="signup"
            buttonsId="signup"
            onClickFunction={handleSignup}
          />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/" replace />
  );
}