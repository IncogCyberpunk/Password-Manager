export default function Introduction() {
  return (
    <>
      <div className="w-fit sm:flex sm:justify-center mt-10 sm:mt-20 sm:mb-10 ">
        <div className="flex flex-col items-center">
          <h1 className="text-5xl sm:text-6xl my-6 sm:my-8 font-extrabold flex relative  sm:right-0 justify-center">
            <span className="text-purple-500">&lt; </span>
            <span>Pass</span>
            <span className="text-green-600">Word</span>
            <span className="text-purple-500"> /&gt;</span>
          </h1>
          <span className="text-2xl sm:text-3xl flex justify-center font-semibold">
            Your Own Password Manager
            <lord-icon
              src="https://cdn.lordicon.com/jpgpblwn.json"
              trigger="loop"
              state="loop-scale"
              style={{width:"45px",height:"45px"}}
              class="relative bottom-1"
            ></lord-icon>
          </span>
        </div>
      </div>
    </>
  );
}
