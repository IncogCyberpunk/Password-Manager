export default function Background({ children }) {
    return (
      <>
        <div className="relative top-0 z-10 h-full w-full bg-white">
          <div className="absolute top-0 right-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
          <div className="relative z-20">
            {children}
          </div>
        </div>
      </>
    );
  }
  