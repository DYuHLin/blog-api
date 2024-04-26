import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const getInitialState = () => {
        const localUser = localStorage.getItem("BLOG_USER");
        return localUser ? JSON.parse(localUser) : false;
    };
    const [user, setUser] = useState(getInitialState);

    useEffect(() => {
        localStorage.setItem('BLOG_USER', JSON.stringify(user));
    }, [user]);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
};

export default UserContext;