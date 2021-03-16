import React, { useContext, useEffect } from 'react';
import { createContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from '../chat/ChatContext';
import { scrollToBottomAnimated } from '../helpers/scrollMensaje';
import { useSocket } from '../hooks/useSocket'
import { types } from '../types/types';

export const SocketContext = createContext();


export const SocketProvider = ({ children }) => {

    const { socket, online, conectarSocket, desconectarSocket } = useSocket('http://localhost:8080');

    const { auth } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext)

    useEffect(() => {
    
        if(auth.logged){
            conectarSocket()
        }

    }, [ auth,conectarSocket ]);

    useEffect(() => {
    
        if(!auth.logged){
            desconectarSocket()
        }

    }, [ auth,desconectarSocket ]);

    //Escuchar los cambios en los usuarios conectados
    useEffect(() => {
   
        socket?.on('lista-usuarios', (user)=>{

            dispatch({
                type: types.userList,
                payload: user,
            })
        })

    }, [ socket, dispatch ]);


    //
    useEffect(() => {

        socket?.on('mensaje-personal', ( message )=>{
            dispatch({
                type: types.nuevoMessage,
                payload: message

            });

            scrollToBottomAnimated('mensaje')

        })

    }, [ socket, dispatch ])
    
    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}