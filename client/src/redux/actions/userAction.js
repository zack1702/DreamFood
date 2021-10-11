import {START_LOADING, STOP_LOADING} from '../constants/loadingConstants'
import { SHOW_ERROR_MESSAGE, SHOW_SUCCESS_MESSAGE} from '../constants/messageConstants'
import { GET_USER,FOLLOW_USER,CREATE_USER,UNFOLLOW_USER,GET_FRIENDS} from '../constants/userConstants'
import axios from 'axios'



  export const createUser = (formData) => async dispatch =>{
    try{
        
        dispatch({type : START_LOADING})
        const response = await axios.post('/api/user/auth',formData);
        dispatch({type:STOP_LOADING})
        dispatch({type:SHOW_SUCCESS_MESSAGE,payload: response.data.successMessage})
        dispatch({type:CREATE_USER,payload: response.data.user})
        
    }catch(err){
        console.log('createUSER Api err',err)
        dispatch({type:STOP_LOADING})
        dispatch({type:SHOW_ERROR_MESSAGE,payload: err.response.data.errorMessage})
    }
} 

export const getUser = (userId) => async dispatch =>{
    
    try{ 
        dispatch({type : START_LOADING})
        const response = await axios.get(`/api/user/${userId}`);
        dispatch({type:STOP_LOADING})
        dispatch({type:GET_USER,payload: response.data})
       
        
    }catch(err){
        console.log('getUser Api err',err)
        dispatch({type:STOP_LOADING})
        dispatch({type:SHOW_ERROR_MESSAGE,payload: err.response.data.errorMessage})
    }
}

export const getFriends = (userId) => async dispatch =>{
    
    try{ 
        dispatch({type : START_LOADING})
        const response = await axios.get(`/api/user/friends/${userId}`);
        dispatch({type:STOP_LOADING})
        dispatch({type:GET_FRIENDS,payload: response.data.friends})
       
        
    }catch(err){
        console.log('getUser Api err',err)
        dispatch({type:STOP_LOADING})
        dispatch({type:SHOW_ERROR_MESSAGE,payload: err.response.data.errorMessage})
    }
}
  
export const followUser = (userId) => async dispatch =>{
    try{ 
        dispatch({type : START_LOADING})
        const response = await axios.put(`/api/user/${userId}/follow`);
        dispatch({type:STOP_LOADING})
        dispatch({type:FOLLOW_USER,payload: response.data})
       
        
    }catch(err){
        console.log('followUser Api err',err)
        dispatch({type:STOP_LOADING})
        dispatch({type:SHOW_ERROR_MESSAGE,payload: err.response.data.errorMessage})
    }
}
 
export const unfollowUser = (userId) => async dispatch =>{
    try{ 
        dispatch({type : START_LOADING})
        const response = await axios.put(`/api/user/${userId}/unfollow`);
        dispatch({type:STOP_LOADING})
        dispatch({type:UNFOLLOW_USER,payload: response.data})
       
        
    }catch(err){
        console.log('unfollowUser Api err',err)
        dispatch({type:STOP_LOADING})
        dispatch({type:SHOW_ERROR_MESSAGE,payload: err.response.data.errorMessage})
    }
}
  
 