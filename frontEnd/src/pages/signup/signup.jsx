import { useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar.jsx";
import Background from "../../components/Background.jsx";
import Introduction from "../../components/Introduction.jsx";

import useSignup from "../../hooks/useSignup.js";
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
            <Introduction />
            {/* Header Section */}
            <div className="font-extrabold mt-5 mb-3 sm:mt-0 underline text-5xl md:text-6xl flex justify-center ">
              <span>
                SIGN<span className="text-green-500">-</span>
                <span className="text-purple-500">UP</span>
              </span>
            </div>

            {/* Form section */}
            <div className="flex pt-3 flex-col gap-2 items-center">
              {/* Full Name  */}
              <div className="flex flex-col items-center">
                <div className="flex flex-col pl-3 xl:flex-row  ">
                  <label
                    htmlFor="fullName"
                    className="pl- font-bold text-xl w-fit "
                  >
                    <span className="text-xl sm:text-2xl xl:text-3xl">
                      Full Name :
                    </span>
                  </label>
                </div>

                {/* Input Field */}
                <div className="w-full mb-3 ">
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    id="fullName"
                    className="inputField placeholder:text-md py-1 pl-3 pr-16"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col items-center">
                <div className="flex flex-col pl-3 xl:flex-row  ">
                  <label
                    htmlFor="email"
                    className="pl- font-bold text-xl w-fit "
                  >
                    <span className="text-xl sm:text-2xl xl:text-3xl">
                      Email Address:
                    </span>
                  </label>
                </div>

                {/* Input Field */}
                <div className="w-full mb-3 ">
                  <input
                    type="text"
                    placeholder="Enter your email address"
                    id="email"
                    className="inputField placeholder:text-md py-1 pl-3 pr-16"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col items-center">
                <div className="flex flex-col pl-3 xl:flex-row  ">
                  <label
                    htmlFor="username"
                    className="pl- font-bold text-xl w-fit "
                  >
                    <span className="text-xl sm:text-2xl xl:text-3xl">
                      Username:
                    </span>
                  </label>
                </div>

                {/* Input Field */}
                <div className="w-full mb-3 ">
                  <input
                    type="text"
                    placeholder="Enter a unique username"
                    id="username"
                    className="inputField placeholder:text-md py-1 pl-3 pr-16"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Password */}
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
                    placeholder="Create a strong password"
                    id="password"
                    className="inputField placeholder:text-md py-1 pl-3 pr-16"
                    onChange={handleChange}
                  />
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
                      className="absolute w-6 right-4 top-1.5 sm:right-4 sm:top-4"
                      alt=""
                    />
                    <div className="absolute -right-5 hidden group-hover:block bg-gray-600 text-white text-sm sm:text-md font-semibold sm:font-bold p-1 rounded-full px-3 shadow-lg">
                      {eyeState === eyeCross
                        ? "Show Password"
                        : "Hide Password"}
                    </div>
                  </div>
                </div>
              </div>

              {/*Confirm Password */}
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
                    placeholder="Enter the password again"
                    id="password"
                    className="inputField placeholder:text-md py-1 pl-3 pr-16"
                    onChange={handleChange}
                  />
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
                      className="absolute w-6 right-4 top-1.5 sm:right-4 sm:top-4"
                      alt=""
                    />
                    <div className="absolute -right-5 hidden group-hover:block bg-gray-600 text-white text-sm sm:text-md font-semibold sm:font-bold p-1 rounded-full px-3 shadow-lg">
                      {eyeState === eyeCross
                        ? "Show Password"
                        : "Hide Password"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Gender input */}
              <div className="flex gap-4 sm:gap-10 mb-2 sm:mb-5 justify-start mt-3 sm:mt-10 ">
                <div className="font-bold text-2xl sm:text-3xl ">
                  <span>
                    Gender <span className="text-green-600 text-xl sm:text-2xl">-&gt;</span>
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
              <div className=" text-center md:mt-3 cursor-pointer ">
                <Link to="/login">
                  <span
                    className="font-semibold text-xl sm:text-2xl underline
                   mt-5 "
                  >
                    Already Have an Account? Log In !
                  </span>
                </Link>
              </div>

              {/* Submit Section */}
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
                  <span className="text-pink-700 ">Sign Up</span>
                </button>
              </div>
            </div>
          </form>
        </Background>
      </main>
    </>
  );
}
