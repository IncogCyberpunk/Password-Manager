import { useState } from "react";

import eyeOpen from "../../assets/animatedGIF/eyeOpen.svg";
import eyeCross from "../../assets/animatedGIF/eyeClose.svg";
import useAddCredentials from "../../hooks/useAddCredentials";

import Navbar from "../../components/Navbar";
import Background from "../../components/Background";

export default function AddCredentials() {
  const [eyeState, setEyeState] = useState(eyeCross);

  const { storeCredentials } = useAddCredentials();

  // this initialization is important so as to make the inputs controlled by a state and not controlled by DOM
  const [credentials, setCredentials] = useState({
    websiteName: "",
    loginEmail: "",
    loginPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storeResponse = await storeCredentials(credentials);
    console.log(`storeResponse is `, storeResponse);
  };
  return (
    <>
      <Navbar />
      <Background>
        <div className="border-4 mx-auto w-[calc(100%-25px)] md:w-fit relative top-32 md:top-52  border-purple-500 rounded-3xl flex flex-col gap-5">
          <form
            className="w-fit mx-auto px-5 md:p-5 rounded-lg"
            onSubmit={handleSubmit}
          >
            {/* Introduction Section */}
            <div className="font-extrabold text-5xl  text-center md:text-wrap md:text-6xl flex flex-col gap-3  items-center justify-center my-5 ">
              <span className="text-green-500">
                PassWord <span className="text-purple-500">Manager</span>
              </span>
              <span className="font-bold text-3xl flex items-center ">
                <lord-icon
                  src="https://cdn.lordicon.com/whtfgdfm.json"
                  trigger={screen.width < 640 ? "loop" : "hover"}
                  delay="1000"
                  style={{width:"50px",height:"50px"}}
                  class="relative bottom-4  md:bottom-0"
                ></lord-icon>
                <span className="underline relative -left-4 md:-left-0" style={{textUnderlineOffset:"4px"}}>Add  details of the website</span>
              </span>
            </div>
            <div className="flex flex-col ">
              {/* Name of Website */}
              <div className="flex flex-col items-center">
                <div className="flex flex-col pl-3 xl:flex-row  ">
                  <label
                    htmlFor="websiteName"
                    className="pl- font-bold text-xl w-fit "
                  >
                    <span className="text-2xl sm:text-2xl xl:text-3xl">
                      Website Name:
                    </span>
                  </label>
                </div>

                {/* Input Field */}
                <div className=" mb-3 ">
                  <input
                    type="text"
                    name="websiteName"
                    placeholder="Enter the website's name"
                    id="websiteName"
                    className="inputField placeholder:text-md py-1 pl-3 pr-16"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Email of website */}
              <div className="flex flex-col items-center">
                <div className="flex flex-col pl-3 xl:flex-row  ">
                  <label
                    htmlFor="loginEmail"
                    className="pl- font-bold text-xl w-fit "
                  >
                    <span className="text-2xl sm:text-2xl xl:text-3xl">
                      Login Email:
                    </span>
                  </label>
                </div>

                {/* Input Field */}
                <div className=" mb-3 ">
                  <input
                    type="text"
                    name="loginEmail"
                    placeholder="Enter the login email"
                    id="loginEmail"
                    className="inputField placeholder:text-md py-1 pl-3 pr-16"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="flex flex-col md:gap-2 items-center ">
                <label
                  htmlFor="password"
                  className="pl-3 font-bold text-xl w-fit "
                >
                  <span className="text-2xl sm:text-2xl xl:text-3xl">
                    Password :
                  </span>
                </label>
                <div className="md:w-full group relative mb-3">
                  <input
                    type={eyeState === eyeCross ? "password" : "text"}
                    name="loginPassword"
                    placeholder="Enter the login password"
                    id="loginPassword"
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
                      className="absolute w-6 right-4 top-2 sm:w-10 sm:right-4 sm:top-4"
                      alt=""
                    />
                    {/* Tooltip */}
                    {screen.width > 640 && (
                      <div className="absolute hidden top-8 -right-5   group-hover:block bg-gray-600 text-white text-sm sm:text-md font-semibold sm:font-bold p-1 rounded-full px-3 shadow-lg">
                        {eyeState === eyeCross
                          ? "Show Password"
                          : "Hide Password"}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Section */}
              <div className="flex justify-center mt-8 mb-5 ">
                <button
                  type="submit"
                  className="border-x-4 border-y-2 p-3 pr-4 border-fuchsia-600  btnField font-bold text-3xl flex gap-2 items-center"
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/jgnvfzqg.json"
                    trigger={screen.screenWidth > 640 ? "hover" : "loop"}
                    delay="800"
                    style={{ width: "45px", height: "45px" }}
                    class=""
                  ></lord-icon>
                  <span className="text-pink-700 ">Add Details</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </Background>
    </>
  );
}
