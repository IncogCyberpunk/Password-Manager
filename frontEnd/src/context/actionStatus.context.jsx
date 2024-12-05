import { createContext,useContext ,useState} from "react";

const actionStatusContext = createContext();

export const useActionStatusContext = () => useContext(actionStatusContext);


export const ActionStatusProvider = ({children}) => {
    const [actionStatus, setActionStatus] = useState(false);

    return (
        <actionStatusContext.Provider value={{actionStatus, setActionStatus}}>
            {children}
        </actionStatusContext.Provider>
    )
}


