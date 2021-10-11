import{ADD_PRODUCT} from '../constants/cartConstants'

const INITIAL_STATE = {
    products :[],
    quantity:0,
    total:0
}

const cartReducer = (state = INITIAL_STATE, action)=>{
    switch (action.type){
        case ADD_PRODUCT:
            return{
                ...state,
                products:[...state.products,action.payload],
                quantity:state.quantity+1,
                total: state.total+ action.payload.price*action.payload.quantity
            }
        
        default:
            return state
    }
}
export default cartReducer