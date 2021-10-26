import { ADD_TO_CART,DELETE_FROM_CART,CREATE_CART } from '../constants/cartConstants';
import {START_LOADING, STOP_LOADING} from '../constants/loadingConstants'
import { SHOW_ERROR_MESSAGE, SHOW_SUCCESS_MESSAGE} from '../constants/messageConstants'
import axios from 'axios'



export const addToCart = (product,quantity) => async dispatch => {
	// if cart already exists in local storage, use it, otherwise set to empty array
	const cart = localStorage.getItem('cart')
		? JSON.parse(localStorage.getItem('cart'))
		: [];

	// check if duplicates
	const duplicates = cart.filter(cartItem => cartItem._id === product._id);

	// if no duplicates, proceed
	if (duplicates.length === 0) {
		// prep product data
		const productToAdd = {
			...product,
			
			count: quantity,
		};

		// add product data to cart
		cart.push(productToAdd);

		// add cart to local storage
		localStorage.setItem('cart', JSON.stringify(cart));

		// add cart to redux
		dispatch({
			type: ADD_TO_CART,
			payload: cart,
		});
	}
};

 export const removeFromCart = (product) => async dispatch => {
	const cart = localStorage.getItem('cart')
		? JSON.parse(localStorage.getItem('cart'))
		: [];

	const updatedCart = cart.filter(cartItem => cartItem._id !== product._id);

	localStorage.setItem('cart', JSON.stringify(updatedCart));

	dispatch({
		type: DELETE_FROM_CART,
		payload: updatedCart,
	});
 	
  
 	
 	
   };

   export const createCart = (formData) => async dispatch =>{
    try{
        
        dispatch({type : START_LOADING})
        const response = await axios.post( '/api/cart' ,formData);
        dispatch({type:STOP_LOADING})
        dispatch({type:SHOW_SUCCESS_MESSAGE,payload: response.data.successMessage})
        dispatch({type:CREATE_CART,payload: response.data.cart})
        
    }catch(err){
        console.log('createCart Api err',err)
        dispatch({type:STOP_LOADING})
        dispatch({type:SHOW_ERROR_MESSAGE,payload: err.response.data.errorMessage})
    }
}