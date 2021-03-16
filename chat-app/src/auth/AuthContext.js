import React, { createContext, useCallback, useContext, useState } from "react";
import { ChatContext } from "../chat/ChatContext";
import { fecthContoken, fecthSintoken } from "../helpers/fecth";
import { types } from "../types/types";


export const AuthContext = createContext();


const initialState = {
    uid: null,
    name: null,
    email: null,
    checking: true,
    logged: false
}




export const AuthProvider = ({ children }) => {


    const [ auth, setAuth ] = useState(initialState);
    const { dispatch } = useContext(ChatContext)

    const register = async(name, email, password) => {

        const resp = await fecthSintoken('auth/register',{name, email,password}, 'POST');
        const { usuario } = resp;

        if(resp.ok){
            localStorage.setItem('token',resp.token);

            setAuth({
                uid: usuario.uid,
                name: usuario.name,
                email: usuario.email,
                checking: false,
                logged: true
            })
        }

        return resp;

    }

    const login = async(email, password) => {


        const resp = await fecthSintoken('auth/login',{email,password}, 'POST');
        const { usuario } = resp;

        if(resp.ok){
            localStorage.setItem('token', resp.token);

            setAuth({
                uid: usuario.uid,
                name: usuario.name,
                email: usuario.email,
                checking: false,
                logged: true,
            })

        }

        return resp.ok
    }

    const logout = () => {

        localStorage.removeItem('token');
        setAuth({
            checking: false,
            logged: false,
        });

        dispatch({
            type: types.limpiarState
        })

    }

    const validateToken =  useCallback( async() =>{

        const token = localStorage.getItem('token');

        //Si el token no existe
        if(!token){
            
            setAuth({
                checking: false,
                logged: false
            });

            return false
        }

        const resp =  await fecthContoken('auth/renew');


        if(resp.ok){


            localStorage.setItem('token', resp.token);
            const { user } = resp;
 
            setAuth({
                uid: user.uid,
                name: user.name,
                email: user.email,
                checking: false,
                logged: true,
            });
            return true
        }else{

            setAuth({
                uid: null,
                name: null,
                email: null,
                checking: false,
                logged: false,
            })

            return false

        }


    },[]
    )


    return (
        <AuthContext.Provider value={{
            auth,
            register,
            login,
            logout,
            validateToken

        }}>
            { children}
        </AuthContext.Provider>
    )
}

