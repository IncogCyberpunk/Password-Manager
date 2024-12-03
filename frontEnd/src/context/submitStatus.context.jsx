import { createContext, useContext, useState } from "react";

const submitStatusContext = createContext();

export const SubmitStatusProvider = ({ children }) => {
  const [submitStatus, setSubmitStatus] = useState(false);

  return (
    <submitStatusContext.Provider value={{ submitStatus, setSubmitStatus }}>
      {children}
    </submitStatusContext.Provider>
  );
};

export const useSubmitStatusContext = () => useContext(submitStatusContext);
