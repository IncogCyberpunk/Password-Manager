import { useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar.jsx";
import Background from "../../components/Background.jsx";
import Introduction from "../../components/Introduction.jsx";

import useSignup from "../../hooks/useSignup.js";
import plusAnimated from "../../assets/animatedGIF/login_animated.gif";
import eyeOpen from "../../assets/animatedGIF/eyeOpen.svg";
import eyeCross from "../../assets/animatedGIF/eyeClose.svg";

import Radio from "../../components/Radio.jsx";

export default function Signup() {
  const [eyeState, setEyeState] = useState(eyeCross);
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSignupData({ ...signupData, [name]: value }); // says to destructure the object and then update the key(name) with the value
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(signupData);
    await useSignup(signupData);
  };

  return (
    <>
      <Navbar />
      <main className="z-10">
        <Background>
          <form
            className=" w-fit mx-auto p-5 rounded-lg"
            onSubmit={handleSubmit}
            >
            <Introduction/>
            {/* Header Section */}
            <div className="font-extrabold text-6xl flex justify-center ">
              <span>
                SIGN<span className="text-green-500">-</span>
                <span className="text-purple-500">UP</span>
              </span>
            </div>

            {/* Form section */}
            <div className="flex flex-col ">
              {/* Full Name Input */}
              <div className="flex flex-col px-10">
                <label
                  htmlFor="fullName"
                  className="pl-5 font-bold text-xl my-5 w-fit "
                >
                  <span className="text-3xl">Full Name</span>
                </label>
                <div className="flex gap-5 mb-3">
                  <input
                    type="text"
                    name="fullName"
                    value={signupData.fullName}
                    placeholder="Enter your Full Name"
                    id="fullName"
                    className="inputField  w-full "
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col px-10">
                <label
                  htmlFor="email"
                  className="pl-5 font-bold text-xl my-5 w-fit "
                >
                  <span className="text-3xl">Email Address</span>
                </label>
                <div className="flex gap-5 mb-3">
                  <input
                    type="text"
                    name="email" // name and value are used to link the input field with the state using setSignupData function
                    id="email" // id is used to link the label with the input field
                    value={signupData.email}
                    placeholder="Enter your email address"
                    className="inputField w-full "
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* username input */}
              <div className="flex flex-col px-10">
                <label
                  htmlFor="username"
                  className="pl-5 font-bold text-xl my-5 w-fit "
                >
                  <span className="text-3xl">Username</span>
                </label>
                <div className="flex gap-5 mb-3">
                  <input
                    type="text"
                    name="username"
                    value={signupData.username}
                    placeholder="Create a unique username"
                    id="username"
                    className="inputField w-full "
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
                <div className="relative ">
                  <input
                    type={eyeState === eyeCross ? "password" : "text"}
                    name="password"
                    value={signupData.password}
                    id="password"
                    placeholder="Enter your password"
                    className="inputField w-full"
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
                      className="absolute w-10 right-9 top-4 "
                      alt=""
                    />
                    {/* Tooltip */}
                    <div className="absolute  right-0 hidden group-hover:block bg-gray-600 text-white text-md font-bold p-2 rounded-full px-3 shadow-lg">
                      {eyeState === eyeCross
                        ? "Show Password"
                        : "Hide Password"}
                    </div>
                  </div>
                </div>
              </div>

              {/*Confirm Password Input */}
              <div className="flex flex-col px-10">
                <label
                  htmlFor="confirmPassword"
                  className="px-5 font-bold text-3xl my-5 w-fit"
                >
                  Confirm Password
                </label>
                <div className="relative ">
                  <input
                    type={eyeState === eyeCross ? "password" : "text"}
                    name="confirmPassword"
                    value={signupData.confirmPassword}
                    id="confirmPassword"
                    placeholder="Enter your password again"
                    className="inputField w-full"
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
                      className="absolute w-10 right-9 top-4 "
                      alt=""
                    />
                    {/* Tooltip */}
                    <div className="absolute  right-0 hidden group-hover:block bg-gray-600 text-white text-md font-bold p-2 rounded-md shadow-lg">
                      {eyeState === eyeCross
                        ? "Show Password"
                        : "Hide Password"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Gender input */}
              <div className="flex gap-10 mb-5 justify-start pl-14 mt-10 ">
                <div className="font-bold text-3xl ">
                  <span>
                    Gender <span className="text-green-600">-&gt;</span>
                  </span>
                </div>
                <div className="flex flex-col gap-2 ">
                  <Radio
                    displayText="Male"
                    radioId="maleRadio"
                    radioName="gender"
                    value="male"
                    defaultChecked
                    onChange={handleChange}
                  />
                  <Radio
                    displayText="Female"
                    radioId="femaleRadio"
                    radioName="gender"
                    value="female"
                    onChange={handleChange}
                  />
                  <Radio
                    displayText="Others"
                    radioId="othersRadio"
                    radioName="gender"
                    value="others"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Don't have an account? */}
              <div className=" text-center mt-5 cursor-pointer ">
                <Link to="/login">
                  <span className="font-bold text-2xl underline mt-5 ">
                    Already Have an Account? Log In !
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
                  <span>Sign Up</span>
                </button>
              </div>
            </div>
          </form>
        </Background>
      </main>
    </>
  );
}
