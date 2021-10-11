import {ADD_PRODUCT} from '../constants/cartConstants'
import {START_LOADING, STOP_LOADING} from '../constants/loadingConstants'
import { SHOW_ERROR_MESSAGE} from '../constants/messageConstants'

import axios from 'axios'

export const addProduct = () => async dispatch =>{
    try{
        dispatch({type : START_LOADING})
        const response = await axios.post('/api/cart');
        dispatch({type:STOP_LOADING})
        dispatch({type:ADD_PRODUCT, payload:response.data.cart})
       
    }catch(err){
        console.log('addProducts au cart err',err)
        dispatch({type:STOP_LOADING})
        dispatch({type:SHOW_ERROR_MESSAGE,payload: err.response.data.errorMessage})
    }
}

