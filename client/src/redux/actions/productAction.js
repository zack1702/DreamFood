
import {START_LOADING, STOP_LOADING} from '../constants/loadingConstants'
import { SHOW_ERROR_MESSAGE, SHOW_SUCCESS_MESSAGE} from '../constants/messageConstants'
import { GET_PRODUCTS,CREATE_PRODUCT,GET_PRODUCT,DELETE_PRODUCT} from '../constants/productConstant'
import axios from 'axios'

export const createProduct = (formData) => async dispatch =>{
    try{
        
        dispatch({type : START_LOADING})
        const response = await axios.post('/api/product',formData);
        dispatch({type:STOP_LOADING})
        dispatch({type:SHOW_SUCCESS_MESSAGE,payload: response.data.successMessage})
        dispatch({type:CREATE_PRODUCT,payload: response.data.product})
        
    }catch(err){
        console.log('createProduct Api err',err)
        dispatch({type:STOP_LOADING})
        dispatch({type:SHOW_ERROR_MESSAGE,payload: err.response.data.errorMessage})
    }
}

export const deleteProduct = (productId) => async dispatch =>{
    try{
        
        dispatch({type : START_LOADING})
        const response = await axios.delete(`/api/product/${productId}`);
        dispatch({type:STOP_LOADING})
        dispatch({type:SHOW_SUCCESS_MESSAGE,payload: response.data.successMessage})
        dispatch({type:DELETE_PRODUCT,payload: response.data})
        
    }catch(err){
        console.log('createProduct Api err',err)
        dispatch({type:STOP_LOADING})
        dispatch({type:SHOW_ERROR_MESSAGE,payload: err.response.data.errorMessage})
    }
}

export const getProducts = () => async dispatch =>{
    try{
        
        dispatch({type : START_LOADING})
        const response = await axios.get('/api/product');
        dispatch({type:STOP_LOADING})
        dispatch({type:GET_PRODUCTS,payload: response.data.products})
       
        
    }catch(err){
        console.log('createProduct Api err',err)
        dispatch({type:STOP_LOADING})
        dispatch({type:SHOW_ERROR_MESSAGE,payload: err.response.data.errorMessage})
    }
}

export const getProductsByCount = () => async dispatch =>{
    try{
        
        dispatch({type : START_LOADING})
        const response = await axios.get('/api/product/count');
        dispatch({type:STOP_LOADING})
        dispatch({type:GET_PRODUCTS,payload: response.data.products})
       
        
    }catch(err){
        console.log('createProduct Api err',err)
        dispatch({type:STOP_LOADING})
        dispatch({type:SHOW_ERROR_MESSAGE,payload: err.response.data.errorMessage})
    }
}

export const getProduct = (productId) => async dispatch =>{
    try{
        
        dispatch({type : START_LOADING})
        const response = await axios.get(`/api/product/${productId}`);
        dispatch({type:STOP_LOADING})
        dispatch({type:GET_PRODUCT,payload: response.data})
      
        
    }catch(err){
        console.log('createProduct Api err',err)
        dispatch({type:STOP_LOADING})
        dispatch({type:SHOW_ERROR_MESSAGE,payload: err.response.data.errorMessage})
    }
}



