import React, { useContext, useState } from 'react'
import { AuthContext } from '../auth/AuthContext';
import { SocketContext } from '../context/SocketContext';
import { ChatContext } from '../chat/ChatContext'

export const SendMenssage = () => {

    const [ message, setMessage ] = useState('');
    const { socket } = useContext( SocketContext );
    const { chatState } = useContext( ChatContext );
    const { auth } = useContext(AuthContext)

    const onChange= ({target}) =>{
        setMessage( target.value );

    }

    const onSubmit = (eve) =>{

        eve.preventDefault();

        if(message.length === 0){ return};
        setMessage('');

        socket.emit('mensaje-personal',{
            from: auth.uid,
            to: chatState.chatActivo,
            message

    })
}

    
    return (
        <form onSubmit= { onSubmit }>
            <div className="type_msg row">
                <div className="input_msg_write col-sm-9">
                    <input 
                        type="text" 
                        className="write_msg" 
                        placeholder="Mensaje..."
                        value={ message }
                        onChange = { onChange } 
                    />
                </div>
                <div className="col-sm-3 text-center">
                    <button className="msg_send_btn mt-3" type="submit">
                        enviar
           </button>
                </div>
            </div>
        </form>
    )
}
