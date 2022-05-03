import { createContext, useCallback, useContext } from "react";
import useToggle from "../hooks/useToggle";

const sidebarContext = createContext();

export function ProvideSidebar({ children }) {
    const [showSidebar, setShowSidebar] = useToggle(true);

    const toggleSidebar = useCallback((showSidebar) => setShowSidebar(!showSidebar)
        , [setShowSidebar]);

    return <sidebarContext.Provider value={{ showSidebar, toggleSidebar }}>
        {children}
    </sidebarContext.Provider>
}

export const useSidebar = () => {
    return useContext(sidebarContext);
}