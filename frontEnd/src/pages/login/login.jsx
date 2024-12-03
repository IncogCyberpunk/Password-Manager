import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useLogin from "../../hooks/useLogin.js";
import plusAnimated from "../../assets/animatedGIF/login_animated.gif";
import eyeOpen from "../../assets/animatedGIF/eyeOpen.svg";
import eyeCross from "../../assets/animatedGIF/eyeClose.svg";

export default function Login() {
  const {login} = useLogin();

  const [eyeState, setEyeState] = useState(eyeCross);
  const [finalLoginData, setFinalLoginData] = useState({});
  const [whichRadio, setwhichRadio] = useState("username");

  let tooltip = (
    <div className="tooltip absolute top-0 right-8 font-bold" data-tip="hello">
      <button className="btn">
        (eyeState === eyeCross ? "Show Password" : "Hide Password")
      </button>
    </div>
  );

  let [loginData, setLoginData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginData({ ...loginData, [name]: value   }); // says to destructure the object and then update the key(name) with the value
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    console.log(`loginData is `,loginData)
    setFinalLoginData({
      password: loginData.password,
      //spread operator takes the object eg: email:loginData.email and then spreads it into the object (saves it as a key value pair) into the new object
      ...(whichRadio === "email" ? { email: loginData.email } : { username: loginData.username }),
    });
    console.log(finalLoginData);
    await login(finalLoginData);
  };

  return (
    <>
      <form className=" w-fit mx-auto p-5 rounded-lg" onSubmit={handleSubmit}>
        <div className="font-extrabold text-6xl flex justify-center my-5">
          <span>
            LOG <span className="text-purple-500">IN</span>
          </span>
        </div>
        <div className="flex flex-col ">


          {/* Email/Username Input */}
          <div className="flex flex-col px-10">
            <div className="flex flex-row gap-10 items-center ">
              <label
                htmlFor="emailUsername"
                className="pl-5 font-bold text-xl my-5 w-fit "
              >
                <span className="text-3xl">Email or Username</span>
              </label>

              <div className="flex gap-6 items-center relative top-1">
                <div className="flex gap-3">
                  <input
                    type="radio"
                    name="loginType"
                    id="usernameRadio"
                    className="radio focus:border-none cursor-pointer"
                    onClick={() => setwhichRadio("username")}
                    defaultChecked
                  />
                  <label
                    htmlFor="usernameRadio"
                    className="font-bold text-xl cursor-pointer"
                  >
                    Username
                  </label>
                </div>
                <div className="flex gap-3">
                  <input
                    type="radio"
                    // creating two radio btns with same `name` attribute will make them belong to same group, so only one can be clicked at a time
                    name="loginType"
                    id="emailRadio"
                    className="radio focus:border-none text-3xl cursor-pointer"
                    onClick={() => setwhichRadio("email")}
                  />
                  <label
                    htmlFor="emailRadio"
                    className="font-bold text-xl w-fit cursor-pointer"
                  >
                    Email
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-5 mb-3">
              <input
                type="text"
                name={whichRadio === "email" ? "email" : "username"}
                value={
                  whichRadio === "email" ? loginData.email : loginData.username
                }
                placeholder="Email or Username"
                id="emailUsername"
                className="inputField w-96 "
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="flex flex-col px-10">
            <label
              htmlFor="password"
              className="px-5 font-bold text-3xl my-5 w-fit"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={eyeState === eyeCross ? "password" : "text"}
                name="password"
                value={loginData.password}
                id="password"
                placeholder="Enter your password"
                className="inputField  "
                onChange={handleChange}
              />
              {/* this `group` class allows to group elements together and apply styles to child component based on the behavior of parent element; `group-` can then be used to apply styles in the child elements according to state  of parent element */}
              {/* here this helped us to  get the tooltip to show up when the eye icon is hovered */}
              <div className="group">
                <img
                  onClick={() => {
                    if (eyeState === eyeCross) {
                      setEyeState(eyeOpen);
                    } else {
                      setEyeState(eyeCross);
                    }
                  }}
                  src={eyeState}
                  className="absolute w-10 right-4 top-4"
                  alt=""
                />
                {/* Tooltip */}
                <div className="absolute right-1 hidden group-hover:block bg-gray-600 text-white text-md font-bold p-2 rounded-full px-3 shadow-lg">
                  {eyeState === eyeCross ? "Show Password" : "Hide Password"}
                </div>
              </div>
            </div>
          </div>

          {/* Don't have an account? */}
          <div className=" text-center mt-5 cursor-pointer ">
            <Link to="/signup">
              <span className="font-bold text-2xl underline mt-5 ">
                Don't Have an Account? Sign Up !
              </span>
            </Link>
          </div>
          {/* Submit Section */}
          <div className="flex justify-center mt-8 flex- ">
            <button
              type="submit"
              className="border-x-4 border-y-2 border-gray-600  btnField font-medium text-3xl flex gap-4 items-center"
            >
              <img src={plusAnimated} className="w-16" alt="Plus button" />
              <span>Log In</span>
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
