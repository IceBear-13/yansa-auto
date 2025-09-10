import { useEffect, useState } from "react";
import Textbox from "../components/Textbox";
import Passwordbox from "../components/Password";
import Buttons from "../components/Buttons";
import { Navigate } from "react-router-dom";
import { authenticate, login } from "../api/authApi";

export default function Login() {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [wrongCredentials, setWrongCredentials] = useState(false);

useEffect(() => {
    const checkAuth = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
              setIsVerified(false);
              setIsLoading(false);
              return;
            }
            const user = await authenticate(token!);
            if (!user.status || user.status === 401) {
              setIsVerified(false);
              setIsLoading(false);
              return;
            } else{
              setIsVerified(true);
            }
        } catch (error) {
            setIsVerified(false);
        }
        setIsLoading(false);
    };
    checkAuth();
}, []);

  const handleSignin = async () => {
    const username = (document.getElementById('uNameLogin') as HTMLInputElement)?.value;
    const password = (document.getElementById('pwdLogin') as HTMLInputElement)?.value;

    const token = await login(username, password);
    if (token) {
      localStorage.setItem("token", token.token);
    } else{
      setWrongCredentials(true);
      return;
    }
    window.location.reload();
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if(e.key === 'Enter'){
      handleSignin();
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }


  return !isVerified ? (
    <div className="w-full h-screen flex py-[5%] px-[10%]">
      <div className="w-full h-full m-auto rounded-lg flex justify-between space-x-10 p-5 border border-gray-200 shadow-xl">
        <div className="w-[50%] lg:flex items-center justify-center hidden">
          <img
            src="thisartwork.jpg"
            className="w-full h-full object-cover rounded-lg hover:scale-102 transition duration-300"
          />
        </div>
        <div className="px-2 w-[50%] flex flex-col flex-grow overflow-auto">
          <h1 className="text-lg font-bold mb-4 mt-1">Sign in</h1>
          {wrongCredentials && <h3 className="text-red-500 text-[20px]">Trying to be someone else? Lock in.</h3>}
          <Textbox
            name="uNameLogin"
            id="uNameLogin"
            labelContent="Username or email"
            placeholder="Enter your username"
            onKeyDown={handleKeyPress}
          />
          <Passwordbox id="pwdLogin" name="pwdLogin" labelContent="Password" onKeyDown={handleKeyPress} />
          <div className="mb-5">
            <input type="checkbox" id="rememberMe" name="rememberMe" />
            <label htmlFor="rememberMe" className="ml-2 text-[18px]">
              Remember me
            </label>
          </div>
          <Buttons buttonText="Sign in" buttonsId="signin" buttonName="signin" onClickFunction={handleSignin}/>

          <div className="mt-auto text-[18px]">
            <a className="underline hover:text-gray-600 hover:cursor-pointer transition duration-300" href="/register">
              Create an account
            </a>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
}
