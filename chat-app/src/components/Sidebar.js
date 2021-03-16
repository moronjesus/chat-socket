import React, { useContext } from 'react'
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from '../chat/ChatContext';
import { SidebarChatItems } from './SidebarChatItems'

export const Sidebar = () => {

    const { chatState } = useContext(ChatContext);
    const { auth } = useContext(AuthContext)
    const { usuarios } = chatState;


    return (

        <div className="inbox_chat">

            {
               usuarios
               .filter((usuario)  => auth.uid !==  usuario.uid )
               .map( user =>(

                <SidebarChatItems key = { user.uid } user={ user } />

               ))
            }
           


            {/* <!-- Espacio extra para scroll --> */}
            <div className="extra_space"></div>


        </div>

    )
}
