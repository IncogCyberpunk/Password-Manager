import { createContext,useContext } from "react";

export const userIdContext= createContext("");

// created this function for ease to use the context 
export const useUserIdContext=() => {
    return useContext(userIdContext);
}
