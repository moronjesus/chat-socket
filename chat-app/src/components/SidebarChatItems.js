import React, { useContext }  from 'react'
import { ChatContext } from '../chat/ChatContext'
import { fecthContoken } from '../helpers/fecth';
import { scrollToBottom } from '../helpers/scrollMensaje';
import { types } from '../types/types'


export const SidebarChatItems = ({ user }) => {

    const { chatState, dispatch } = useContext( ChatContext);
    const { chatActivo } = chatState

    const onClickUserChat = async()=>{

        dispatch({
            type: types.selectUserChat,
            payload: user.uid
        });

        //solicitar los mensajes de el chat seleccionado
        const mensajes = await fecthContoken(`mensaje/${user.uid}`);
     
        dispatch({
            type: types.cragarMensajes,
            payload: mensajes.mensajeDe.reverse()
        });

        scrollToBottom('mensaje')
    }

    return (

        <div 
            className={`chat_list ${(user.uid === chatActivo) && "active_chat" }`}
            onClick={ onClickUserChat }

        >
            <div className="chat_people">
                <div className="chat_img">
                    <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
                </div>
                <div className="chat_ib">
                <h5>{user.name}</h5>

                    {
                        (user.online)
                            ? <span className="text-success">online</span>
                            :<span className="text-danger">offline</span>
                    } 
                            
                </div>
            </div>
        </div>

    )

}
