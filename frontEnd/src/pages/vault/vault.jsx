import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import Background from "../../components/Background";
import Navbar from "../../components/Navbar";
import useVault from "../../hooks/useVault";
import CopyBtn from "../../components/CopyBtn";

import { useSubmitStatusContext } from "../../context/submitStatus.context";
import useDeleteCredentials from "../../hooks/deleteCredentials";


export default function Vault() {
  const broadcastChannel = new BroadcastChannel("submitStatusChannel");
  
  const [expand, setExpand] = useState(false)
  const {performDelete}= useDeleteCredentials();

  const { retrieveCredentials, retrievedCredentials = [], setRetrievedCredentials } = useVault();

  const { submitStatus, setSubmitStatus } = useSubmitStatusContext();

  const initialRender = useRef(true);

  // useEffect for retrieving credentials from the server when submitStatus is true or when the component is initially rendered
  useEffect(() => {
    if (submitStatus || (initialRender.current && window.location.href.includes("/vault"))) {
      retrieveCredentials()?.then((data) => {
        setRetrievedCredentials(data);
        setSubmitStatus(false);
      }).catch((err) => {
        console.error("Error retrieving credentials:", err);
        setRetrievedCredentials([]);
      });
    }

    console.log(`for broadcastChannel the submitStatus is ${submitStatus}`)
    // this method automatically adds an event listener to the broadcastChannel and listens for messages
    broadcastChannel.onmessage = (e) => {
      const { submitStatus } = e.data;
      console.log(`message received : `, e);
      
      if (submitStatus) {
        console.log(
          "Received update of submitStatus from the BroadcastChannel",
        );
        setSubmitStatus(false);
      }
    };

    // BroadcastChannel sets up a event listener so , necessary to use cleanup function to remove previous event listener to prevent memory leaks
    return () => {
      broadcastChannel.close();
      initialRender.current = false;
    };
  }, [submitStatus]);

  // // useEffect's primary purpose it to listen for updates to states , so here used to listen for updates to submitStatus from the broadcastChannel
  // useEffect(() => {
  //   // this method automatically adds an event listener to the broadcastChannel and listens for messages
  //   broadcastChannel.onmessage = (e) => {
  //     const { submitStatus } = e.data;
  //     console.log(`message received : `, e);
  //     if (submitStatus) {
  //       console.log(
  //         "Received update of submitStatus from the BroadcastChannel",
  //       );
  //       setSubmitStatus(false);
  //     }
  //   };

  //   // BroadcastChannel sets up a event listener so , necessary to use cleanup function to remove previous event listener to prevent memory leaks
  //   return () => {
  //     broadcastChannel.close();
  //   };

  //   //An empty dependency array is used because the BroadcastChannel setup doesn't rely on any state or props and should initialize only once for the component's lifetime
  // }, []);

  const laptopViewTable = (
  <table
    style={{ width: "94rem" }}
    className=" bg-purple-100 mx-auto overflow-hidden rounded-3xl text-2xl border-gray-300 mb-40"
  >
    <thead>
      <tr className="bg-purple-600 text-white">
        <th className="px-6 py-3 border-b border-r text-3xl  border-purple-400">
          Website{" "}
        </th>
        <th className="px-6 py-3 border-b border-r text-3xl border-purple-400">
          Login Email
        </th>
        <th className="px-6 py-3 border-b border-r text-3xl border-purple-400">
          Password
        </th>
      </tr>
    </thead>
    <tbody>
      {retrievedCredentials?.map((item, index) => {
        let whichBg = index % 2 === 0 ? "bg-purple-50" : "bg-white ";

        return (
          <tr className={`${whichBg}  text-center `} key={item._id}>
            <td>
              {/* `td` are not block-level element that are table's layout's part and flex requires a block-level or inline-block element so used a div to use flex properly */}
              <div className="flex justify-between  px-6 py-4  border-b-2 border-r-2 hover:bg-green-300 border-gray-300">
                <span className=" w-full ">{item.websiteName}</span>
                <span className="">
                  <CopyBtn textToCopy={item.websiteName} />
                </span>
              </div>
            </td>

            <td>
              <div className="flex justify-between px-6 py-4  border-b-2 border-r-2 hover:bg-green-300 border-gray-300">
                <span className=" w-full ">{item.loginEmail}</span>
                <span className="">
                  <CopyBtn textToCopy={item.loginEmail} />
                </span>
              </div>
            </td>

            <td>
              <div className="flex justify-between px-6 py-4  border-b-2 border-r-2 hover:bg-green-300 border-gray-300">
                <span className=" w-full ">{item.loginPassword}</span>
                <span className="">
                  <CopyBtn textToCopy={item.loginPassword} />
                </span>
              </div>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
  )

  const mobileViewTable = (
    <div className="px-4 space-y-4 ">
      {retrievedCredentials?.map((item, index) => {
        let whichBg = index % 2 === 0 ? "bg-purple-50" : "bg-white";
        return (
          <div className={`${whichBg} px-4 py-3 rounded-lg shadow-md border-2 border-purple-600 `} key={item._id}>
            {/* Website name and delete entire credential */}
            <div className={`flex justify-between items-center ${expand && "border-b-2 border-purple-400"}`}>
              {/* Expand/Collapse button */}
              <div onClick={() => setExpand(!expand)}>
                <lord-icon
                  src={!expand ? "https://cdn.lordicon.com/xcrjfuzb.json" : "https://cdn.lordicon.com/ternnbni.json"}
                  trigger="loop"
                  delay="2000"
                  style={{ width: "28px", height: '28px' }}>
                </lord-icon>
              </div>
              {/* Website Name */}
              <div className="flex items-center">
                <span className="text-gray-800 font-extrabold text-3xl">{item.websiteName}</span>
              </div>
              {/* Delete credential button */}
              <div onClick={()=> performDelete(item._id)}>
                <lord-icon
                  src="https://cdn.lordicon.com/skkahier.json"
                  trigger={screen.width < 640 ? "click" : "hover"}
                  state="morph-trash-full-to-empty"
                  style={{ width: "28px", height: '28px' }}>
                </lord-icon>
              </div>
            </div>
            
            {expand && <div>

              {/* Login Email */}
              <div className="flex justify-between items-center py-1 ">
                <span className="font-extrabold underline text-lg text-gray-900 text-nowrap">Login Email :</span>
                <span className="text-gray-800 text-wrap">{item.loginEmail}</span>
                <CopyBtn textToCopy={item.loginEmail} />
              </div>

              {/* Password */}
              <div className="flex justify-between items-center py-1 ">
                <span className="font-extrabold underline text-lg text-gray-900 text-nowrap">Password :</span>
                <span className="text-gray-800 text-wrap">{item.loginPassword}</span>
                <CopyBtn textToCopy={item.loginPassword} />
              </div>
            </div>}
          </div>
        );
      })}
    </div>
  )


  // `retrievedCredentials && retrievedCredentials.length > 0 ` is done so that credentialsTable is only rendered when it is not null, thus preventing the application breaking down when it is null
  const credentialsContent = retrievedCredentials?.length > 0 && (screen.width < 768 ? mobileViewTable : laptopViewTable)

  const noCredentialsContent = (
    <h1 className="text-center flex flex-col items-center gap-14">
      <span className="text-5xl md:text-7xl font-bold ">
        <span>No credentials in the vault</span>
        <lord-icon
          src="https://cdn.lordicon.com/keaiyjcx.json"
          trigger={screen.width < 640 ? "loop" : "hover"}
          delay="2000"
          state="hover-error-4"
          style={{width:"45px",height:"45px"}}
          class="relative top-2 left-3">
        </lord-icon>
      </span>
      <button className="border-x-4 border-y-2 w-[calc(100%-80px)] md:w-full p-3 px-4 border-fuchsia-600  btnField font-bold text">
        <Link to="/addcredentials" className="flex items-center ">
          <lord-icon
            src="https://cdn.lordicon.com/ahoskycx.json"
            trigger={screen.width < 640 ? "loop" : "hover"}
            delay="1500"
            style={{ width: "65px", height: "65px" }}
            class=""
          ></lord-icon>
          <span
            className={`text-pink-700 ${screen.width < 640 ? "text-4xl" : "text-5xl"}`}>
            Click to Add Credentials
          </span>
        </Link>
      </button>
    </h1>
  );
  return (
    <>
      <Navbar />
      <Background />
      <header>
        <div className="font-extrabold w-[calc(100%-20px)] md:w-full mx-auto text-6xl md:mt-36 flex flex-col gap-3 items-center justify-center mt-5 mb-10 md:my-20 ">
          <span className="text-green-500 text-center">
            Your <span className="text-purple-500">Vault</span>
          </span>
          <span className="font-bold text-3xl flex items-center gap-3">
            <lord-icon
              src="https://cdn.lordicon.com/nizfqlnk.json"
              trigger={screen.screenWidth > 640 ? "hover" : "loop"}
              delay="1500"
              style={{ width: "45px", height: "45px" }}
              class="relative bottom-5 left-2 md:left-0 md:bottom-0"
            ></lord-icon>
            <span className="text-center">
              <span>All your credentials in one place</span>
              <lord-icon
                src="https://cdn.lordicon.com/jpgpblwn.json"
                trigger="loop"
                delay="1000"
                state="loop-scale"
                style={{ width: "35px", height: "35px" }}
                class={` relative ${screen.innerWidth > 640 ? "" : "top-4 left-2"
                  }`}
              ></lord-icon>
            </span>
          </span>
        </div>
      </header>
      <main>
        {!(retrievedCredentials && retrievedCredentials?.length) > 0 ? noCredentialsContent : credentialsContent}
      </main>
      <Background />
    </>
  );
}
