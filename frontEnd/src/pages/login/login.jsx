/*
STATE UPDATE MECHANISM IN REACT:
https://chatgpt.com/share/675191a1-834c-800a-8c44-1846cead1f02
*/

import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar.jsx";
import Background from "../../components/Background.jsx";
import Introduction from "../../components/Introduction.jsx";

import useLogin from "../../hooks/useLogin.js";
import plusAnimated from "../../assets/animatedGIF/login_animated.gif";
import eyeOpen from "../../assets/animatedGIF/eyeOpen.svg";
import eyeCross from "../../assets/animatedGIF/eyeClose.svg";

export default function Login() {
  const { login } = useLogin();
  const radioClick = useRef(null);

  const [eyeState, setEyeState] = useState(eyeCross);
  const [whichRadio, setwhichRadio] = useState("username");
  const [finalLoginData, setFinalLoginData] = useState({});
  const [clickStatus, setClickStatus] = useState(false);

  let [loginData, setLoginData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  // STATE UPDATES ARE ASYNCHRONOUS IN REACT AND ARE BATCHED, SO ARE NOT IMMEDIATELY REFLECTED AND UPDATED IN THE NEXT RENDER CYCLE

  const handleSubmit = (e) => {
    e.preventDefault();
    setClickStatus(true);
    console.log(`loginData is `, loginData);

    // Set finalLoginData first
    const finalData = {
      password: loginData.password,
      ...(whichRadio === "email"
        ? { email: loginData.email }
        : { username: loginData.username }),
    };

    // this state update (asynchronous process) is scheduled for next render cycle, so it will only be updated after all the sycnhronous code in this function is executed
    setFinalLoginData(finalData);
  };
  useEffect(() => {
    if (clickStatus) {
      console.log("finalLoginData is ", finalLoginData);
      login(finalLoginData);
    }
  }, [finalLoginData]);

  return (
    <div className="max-w-[468px] sm:max-w-screen-sm">
      <Navbar />
      <main className="z-10">
        <Background>
          <form className="p-5 rounded-lg z-50" onSubmit={handleSubmit} onLoad={()=> radioClick.current.focus()}>
            <Introduction />
            <div className="font-extrabold text-5xl flex  justify-center  underline my-7 sm:my-6">
              <span className="">
                LOG<span className="text-purple-500">IN</span>
              </span>
            </div>

            {/* Details Section */}
            <div className="flex flex-col items-center">
              {/* Email/Username Input */}
              <div className="flex flex-col items-center">
                <div className="flex flex-col pl-3 xl:flex-row  ">
                  <label
                    htmlFor="emailUsername"
                    className="pl- font-bold text-xl w-fit "
                  >
                    <span className="text-xl sm:text-2xl xl:text-3xl">
                      Email or Username :
                    </span>
                  </label>

                  <div className="flex gap-3 mt-0 mb-2 sm:mb-0 items-center relative right-5 ">
                    <div className="flex gap-2">
                      <input
                        type="radio"
                        name="loginType"
                        id="usernameRadio"
                        className="radio focus:border-none cursor-pointer"
                        onClick={() => {
                          radioClick.current.focus();
                          setwhichRadio("username");
                        }}
                        defaultChecked
                      />
                      <label
                        htmlFor="usernameRadio"
                        className="font-medium text-xl cursor-pointer"
                      >
                        Username
                      </label>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="radio"
                        name="loginType"
                        id="emailRadio"
                        className="radio focus:border-none text-3xl cursor-pointer"
                        onClick={() => {
                          radioClick.current.focus();
                          setwhichRadio("username");
                        }}
                      />
                      <label
                        htmlFor="emailRadio"
                        className="font-medium text-xl w-fit cursor-pointer"
                      >
                        Email
                      </label>
                    </div>
                  </div>
                </div>

                {/* Input Field */}
                <div className="w-full mb-3 ">
                  <input
                    ref={radioClick}
                    type="text"
                    name={whichRadio === "email" ? "email" : "username"}
                    value={
                      whichRadio === "email"
                        ? loginData.email
                        : loginData.username
                    }
                    placeholder="Email or Username"
                    id="emailUsername"
                    className="inputField placeholder:text-md py-1 pl-3 pr-16"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="flex flex-col gap-2 items-center ">
                <label
                  htmlFor="password"
                  className="pl-3 font-bold text-xl w-fit "
                >
                  <span className="text-xl sm:text-2xl xl:text-3xl">
                    Password
                  </span>
                </label>
                <div className="w-full group relative mb-3">
                  <input
                    type={eyeState === eyeCross ? "password" : "text"}
                    name="password"
                    value={loginData.password}
                    placeholder="Enter your password"
                    id="password"
                    className="inputField placeholder:text-md py-1 pl-3 pr-16"
                    onChange={handleChange}
                  />
                  <div className="group">
                    <img onClick={() => {
                        if (eyeState === eyeCross) {
                          setEyeState(eyeOpen);
                        } else {
                          setEyeState(eyeCross);
                        }
                      }}
                      src={eyeState}
                      className="absolute w-6 right-4 top-2 sm:w-10 sm:right-4 sm:top-4"
                      alt=""
                    />
                    <div className="absolute border-4 border-red-500 hidden top-8 -right-5   group-hover:block bg-gray-600 text-white text-sm sm:text-md font-semibold sm:font-bold p-1 rounded-full px-3 shadow-lg">
                      {eyeState === eyeCross
                        ? "Show Password"
                        : "Hide Password"}
                    </div>
                  </div>
                  
                </div>
              </div>

              {/* If no account , signup */}
              <div className="text-center  mt-3 sm:mt-5 cursor-pointer ">
                <Link to="/signup">
                  <span className=" font-semibold text-xl sm:font-bold sm:text-2xl underline mt-5 ">
                    Don't Have an Account? Sign Up !!
                  </span>
                </Link>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center mt-8 ">
                <button
                  type="submit"
                  className="border-x-4 border-y-2 p-3 pr-4 border-fuchsia-600  btnField font-bold text-3xl flex gap-2 items-center"
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/nfgmqqvs.json"
                    trigger="loop"
                    delay="3000"
                    style={{ width: "45px", height: "45px" }}
                    class=""
                  ></lord-icon>
                  <span className="text-pink-700 ">Log In</span>
                </button>
              </div>
            </div>
          </form>
        </Background>
      </main>
    </div>
  );
}
