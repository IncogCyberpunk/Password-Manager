import eyeOpen from "../../assets/animatedGIF/eyeOpen.svg";
import eyeCross from "../../assets/animatedGIF/eyeClose.svg";

export default function Tooltip({eyeState}) {

  return (
    <>
      <div
        className="tooltip absolute top-0 right-8 font-bold"
        data-tip="hello"
      >
        <button className="btn">
          {(eyeState === eyeCross ? "Show Password" : "Hide Password")}
        </button>
      </div>
    </>
  );
}
