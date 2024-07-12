import {createContext, useState} from 'react'

export const firebaseContext=createContext(null);
export const AuthContext=createContext(null);

const Context=({children})=>{                       //?component to wrap the app : so that we can use this state from every children 
               
    const [user,setUser]=useState('');
    return ( 
        <AuthContext.Provider value={{user,setUser}}>
            {children}
        </AuthContext.Provider>

    )
}

export default Context;
