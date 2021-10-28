import {GET_PRODUCTS,GET_PRODUCT,CREATE_PRODUCT,DELETE_PRODUCT} from '../constants/productConstant'

const INITIAL_STATE = {
    products:[]
}

const productReducer= ( state=INITIAL_STATE,action)=>{
    switch(action.type){
        case GET_PRODUCTS:
            return{
               
                products:[action.payload]
            }
        case GET_PRODUCT:
            return{
                product:action.payload
            }
        case DELETE_PRODUCT:
                return{
                    products: state.products.filter(p => p._id !== action.payload._id )
                }
        case CREATE_PRODUCT:
                return{
                    products:[...state.products,action.payload]
                }
        default:
            return state
    }
}
export default productReducer;