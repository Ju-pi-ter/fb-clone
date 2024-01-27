import React, { useState, useContext, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import { auth } from "../components/firebase";

const AuthContext = React.createContext();
export const useAuth = () => useContext(AuthContext)


export const AuthProvider = ({children}) => {
const navigate = useNavigate()
const [loading, setLoading] = useState(true);
const [user, setUser] = useState(null)


useEffect(() => {
    auth.onAuthStateChanged( (user) => {
        
        setUser(user);
        setLoading(false);
        if(user) {
            
            navigate('/chats')}
    }

    )
     
}, [user, navigate])

const value = {user};

return(
    
    <AuthContext.Provider value={value} >
        {!loading && children}

    </AuthContext.Provider>
)


}