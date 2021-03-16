import { types } from "../types/types";

/* 
const initialState = {
    uid:'',
    chatActivo:null,
    usuarios: [],
    mensajes: [],
} */

export const chatReducer = (state, action) => {

    switch (action.type) {

        case types.userList:

            return {
                ...state,
                usuarios: [...action.payload]
            }

        case types.selectUserChat:

            if (state.chatActivo === action.payload) return state;

            return {
                ...state,
                chatActivo: action.payload,
                mensajes: []
            }

        case types.nuevoMessage:

            if (state.chatActivo === action.payload.to ||
                state.chatActivo === action.payload.from) {

                return {
                    ...state,
                    mensajes: [...state.mensajes, action.payload]
                }
            } else {
                return state
            }

        case types.cragarMensajes:

            return {
                ...state,
                mensajes: [...action.payload]
            }


        case types.limpiarState:

        return {
            uid:'',
            chatActivo:null,
            usuarios: [],
            mensajes: [],
        }

        default:
            return state;
    }


}