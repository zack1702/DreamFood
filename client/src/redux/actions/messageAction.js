import {CLEAR_MESSAGE} from '../constants/messageConstants'

export const clear_messages = ()=> dispatch =>{
    dispatch({
        type:CLEAR_MESSAGE
    })
}