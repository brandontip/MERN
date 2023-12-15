import {createContext} from "react";

export const AuthContext = createContext({
    userId: null,
    isLoggedIn: false,
    login: () => {},
    logout: () => {},
    token: null
});


export default AuthContext;