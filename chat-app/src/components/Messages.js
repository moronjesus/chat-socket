import React, { useContext } from 'react'
import { AuthContext } from '../auth/AuthContext'
import { ChatContext } from '../chat/ChatContext'
import { IncomingMessage } from './IncomingMessage'
import { OutgoingMessage } from './OutgoingMessage'
import { SendMenssage } from './SendMenssage'

export const Messages = () => {

    const { chatState } = useContext(ChatContext);
    const { auth } = useContext(AuthContext)

    return (

        <div className="mesgs" >
            <div className="msg_history" id= "mensaje">

                {
                    chatState.mensajes.map(msg=>(

                        (msg.to === auth.uid)
                        ? <IncomingMessage key ={msg._id} msg={msg} />
                        : <OutgoingMessage key={msg._id} msg={msg} />
                    ))
                }

            </div>

           <SendMenssage />

        </div>

    )
}
