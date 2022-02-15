import { createContext, useContext, useReducer } from "react";

export const Store = createContext();
Store.displayName = "Store";

export const useStore = () => useContext(Store);

export const StoreProvider = ({children, initialState, reducer}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <Store.Provider value={[state, dispatch]}>
            {children}
        </Store.Provider>
    )
}