import { useContext ,createContext} from "react";

export const accessStatusContext= createContext();

export const  useAccessStatus= () => {
    return useContext(accessStatusContext)
};
