import{GET_CATEGORIES, CREATE_CATEGORY} from '../constants/categoryConstants'

const INITIAL_STATE = {
    categories :[]
}

const categoryReducer = (state = INITIAL_STATE, action)=>{
    switch (action.type){
        case GET_CATEGORIES:
            return{
                ...state,
                categories: action.payload
            }
        case CREATE_CATEGORY:
                return{
                    ...state,//action.payload= reponse du backend ...state.categories= les categoies existantes
                    categories:[...state.categories,action.payload] 
                }
        default:
            return state
    }
}
export default categoryReducer