

export default function Radio(props){
    return (
        <>
            <div className="flex gap-3 ">
                  <input
                    type="radio"
                    name={props.radioName}
                    id={props.radioId}
                    value={props.value}
                    className="radio focus:border-none cursor-pointer"
                    onChange={props.onChange}
                    
                  />
                  <label
                    htmlFor={props.radioId}
                    className="font-semibold text-3xl cursor-pointer"
                  >
                    {props.displayText}
                  </label>
                </div>
        </>
    )
}