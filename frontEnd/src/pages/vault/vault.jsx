import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import list from "../../assets/animatedGIF/list.gif";
import Background from "../../components/Background";
import Navbar from "../../components/Navbar";
import useVault from "../../hooks/useVault";
import CopyBtn from "../../components/CopyBtn";

import { useSubmitStatusContext } from "../../context/submitStatus.context";

const broadcastChannel= new BroadcastChannel("submitStatusChannel")


export default function Vault() {
  const { retrieveCredentials, retrievedCredentials, setRetrievedCredentials } = useVault();

  const { submitStatus, setSubmitStatus } = useSubmitStatusContext();
  console.log(`The submit status is: `,submitStatus)

  // useRef is used so that the vaule of initalRender is not changed during re-renders and 0 ms delay is only for initial render and not for re-renders helping keep track whether it is the initial render or not
  const initialRender = useRef(true)


  // useEffect for retrieving credentials from the server when submitStatus is true or when the component is initially rendered
  useEffect(() => {
    if (submitStatus || initialRender.current) {
      retrieveCredentials().then((data) => {
        setRetrievedCredentials(data);
        console.log(`useEffect ran and now turning submitStatus to false`)
        setSubmitStatus(false); 
      });
    }
  }, [submitStatus]);
  
  // useEffect's primary purpose it to listen for updates to states , so here used to listen for updates to submitStatus from the broadcastChannel
  useEffect(() => {

    broadcastChannel.onmessage = (e)=>{
      const {submitStatus}= e.data;
      if(submitStatus){
        console.log('Received update of submitStatus from the BroadcastChannel')
        setSubmitStatus(true);
      }
    }
    
    // BroadcastChannel sets up a event listener so , necessary to use cleanup function to remove previous event listener to prevent memory leaks
    return () => {
      broadcastChannel.close();
    }
    
    
    //An empty dependency array is used because the BroadcastChannel setup doesn't rely on any state or props and should initialize only once for the component's lifetime
  },[]);
  

  // `retrievedCredentials && retrievedCredentials.length > 0 ` is done so that credentialsTable is only rendered when it is not null, thus preventing the application breaking down when it is null
  const credentialsContent = retrievedCredentials &&
    retrievedCredentials.length > 0 && (
      <table style={{ width: "94rem" }} className=" bg-purple-100 mx-auto overflow-hidden rounded-3xl text-2xl border-gray-300 mb-40" >
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
          {retrievedCredentials.map((item, index) => {
            let whichBg = index % 2 === 0 ? "bg-purple-50" : "bg-white ";

            return (
              <tr className={`${whichBg}  text-center `} key={index}>
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
    );

  const noCredentialsContent = (
    <h1 className="text-center flex flex-col gap-14">
      <span className="text-7xl font-bold">No credentials in the vault !!</span>{" "}
      <button className="btnField w-fit mx-auto font-semibold text-3xl">
        <Link to="/manager">Click to Add credentials to the Vault</Link>
      </button>
    </h1>
  );
  return (
    <>
      <Navbar />
      <Background />
        <header>
          <div className="font-extrabold text-6xl mt-36 flex flex-col gap-3 items-center justify-center my-20 ">
            <span className="text-green-500">
              Your <span className="text-purple-500">Vault</span>
            </span>
            <span className="font-bold text-3xl flex items-center gap-3">
              <img src={list} className="" alt="" />
              <span> All your credentials in one place</span>
            </span>
          </div>
        </header>

        <main>
          {retrievedCredentials === null ? noCredentialsContent  : credentialsContent}
        </main>
      <Background />
    </>
  );
}


