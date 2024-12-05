import { useState } from "react";
import { Link } from "react-router-dom";

import eyeOpen from "../../assets/animatedGIF/eyeOpen.svg";
import eyeCross from "../../assets/animatedGIF/eyeClose.svg";
import rightArrow from "../../assets/animatedGIF/right_arrow.gif";
import addImage from "../../assets/animatedGIF/pages.gif";
import useStoreCredentials from "../../hooks/useStoreCredentials";

import Navbar from "../../components/Navbar";
import Background from "../../components/Background";
import Vault from "../vault/vault";


export default function AddCredentials() {
  const [eyeState, setEyeState] = useState(eyeCross);

  const{ storeCredentials} = useStoreCredentials();

  // this initialization is important so as to make the inputs controlled by a state and not controlled by DOM
  const [credentials, setCredentials] = useState({
    websiteName: "",
    loginEmail: "",
    loginPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCredentials({ ...credentials, [name]: value }); // says to destructure the object and then update the key(name) with the value
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const storeResponse=await storeCredentials(credentials);
    console.log(`storeResponse is `,storeResponse)
  };
  return (
    <>
      <Navbar />
      <Background>
        <div className="border-4 mx-auto w-fit relative top-52 border-purple-500 rounded-2xl flex flex-col gap-5">
          <form
            className=" w-fit mx-auto p-5 rounded-lg"
            onSubmit={handleSubmit}
          >
            <div className="font-extrabold text-6xl flex flex-col gap-3 items-center justify-center my-5 ">
              <span className="text-green-500">
                PassWord <span className="text-purple-500">Manager</span>
              </span>
              <span className="font-bold text-3xl flex items-center gap-3">
                <img src={rightArrow} className="" alt="" />
                Add the details of the website
              </span>
            </div>
            <div className="flex flex-col ">
              {/* Name of website */}
              <div className="flex flex-col px-10">
                <label
                  htmlFor="websiteName "
                  className="pl-5 font-bold text-xl my-5  "
                >
                  <span className="text-3xl">Name Of Website</span>
                </label>

                <div className="flex gap-5 mb-3">
                  <input
                    type="text"
                    name="websiteName"
                    placeholder="Enter the name of the website"
                    id="websiteName"
                    className="inputField "
                    style={{ width: "" }}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/* Email of website */}
              <div className="flex flex-col px-10">
                <label
                  htmlFor="loginEmail"
                  className="pl-5 font-bold text-xl my-5 w-fit "
                >
                  <span className="text-3xl">Email Of Website</span>
                </label>

                <div className="flex gap-5 mb-3">
                  <input
                    type="text"
                    name="loginEmail"
                    placeholder="Enter the email of the website"
                    id="loginEmail"
                    className="inputField  "
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="flex flex-col px-10">
                <label
                  htmlFor="loginPassword"
                  className="px-5 font-bold text-3xl my-5 w-fit"
                >
                  Password
                </label>
                <div className="relative ">
                  <input
                    type={eyeState === eyeCross ? "password" : "text"}
                    name="loginPassword"
                    value={credentials.loginPassword}
                    id="loginPassword"
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
                    <div className="absolute right-1 hidden group-hover:block bg-gray-600 text-white text-md font-bold p-2 rounded-full px-3 shadow-lg">
                      {eyeState === eyeCross
                        ? "Show Password"
                        : "Hide Password"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Section */}
              <div className="flex justify-center mt-8 flex- ">
                <button
                  type="submit"
                  className="border-x-4 border-y-2 border-gray-600  btnField font-medium text-3xl flex gap-4 items-center"
                >
                  <img src={addImage} className="" alt="Plus button" />
                  <span>Add Details</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </Background>
    </>
  );
}
