export default function Introduction() {
  return (
    <>
      <div className="w-fit sm:flex sm:justify-center mt-10 sm:mt-20 sm:mb-10 ">
        <div className="flex flex-col items-center">
          <h1 className="text-5xl sm:text-6xl my-6 sm:my-8 font-extrabold flex relative left-10 sm:left-0  justify-center">
            <span className="text-purple-500">&lt; </span>
            <span>Pass</span>
            <span className="text-green-600">Word</span>
            <span className="text-purple-500"> /&gt;</span>
          </h1>
          <span className="text-2xl sm:text-3xl flex justify-center relative left-10 sm:left-0 font-semibold ">
            {screen.innerWidth > 640 ? <span className="">Your Own Password Manager </span> : <div><div className="text-center">Your Own </div><div>Password Manager </div></div>}
            <lord-icon
              src="https://cdn.lordicon.com/jpgpblwn.json"
              trigger="loop"
              delay="3000"
              state="loop-scale"
              style={{ width: "35px", height: "35px" }}
              class={` relative ${screen.innerWidth > 640 ? "" : "top-8 left-2"}`}
            ></lord-icon>
          </span>
        </div>
      </div>
    </>
  );
}
