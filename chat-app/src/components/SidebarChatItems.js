import React, { useContext } from 'react'
import { ChatContext } from '../chat/ChatContext'
import { fecthContoken } from '../helpers/fecth';
import { scrollToBottom } from '../helpers/scrollMensaje';
import { types } from '../types/types'


export const SidebarChatItems = ({ user }) => {

    const { dispatch } = useContext(ChatContext);

    const onClickUserChat = async () => {

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

        <div className="card-chat" onClick={onClickUserChat}>

            <div className="card-avatar">
                <img src="https://ptetutorials.com/images/user-profile.png" alt="no fount" className="design-img"></img>
                <div className="border-chat">
                    <div className={` ${(user.online) ? "activo" : "inactivo"}`}>
                    </div>
                </div>
            </div>

            <div className="card-contenido">
                <div className="card-text">
                    <h3 className="name-chat">{user.name}</h3>
                    <div className="row-chat">
                        <p className="">You: Thanks, sounds good. What about doing a webinar, too?</p>
                        <span className="separador">.</span>
                        <time> 8hr </time>
                    </div>
                </div>
                <div className="card-indicador">
                    <img src="https://ptetutorials.com/images/user-profile.png" alt="no fount" className="design-img-icon"></img>
                </div>
            </div>

        </div>

    )

}
