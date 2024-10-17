import { createContext, ReactNode, useContext, useState } from 'react';

interface ContextUser {
    userId: string,
    setUserId: React.Dispatch<React.SetStateAction<string>>
}

const UserContext = createContext<ContextUser>({
    userId: "",
    setUserId: () => {}
})

const useUserContext = () => useContext(UserContext);

const handleUserId = () => {
    const userId = localStorage.getItem("userId");
    return userId ? userId : "";
}

const UserProvider = ({children}: {children: ReactNode}) => {
    const [userId, setUserId] = useState(handleUserId);

    return (
        <UserContext.Provider value={{userId, setUserId}}>
            {children}
        </UserContext.Provider>
    )
}

export { useUserContext, UserProvider }