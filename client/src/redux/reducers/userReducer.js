
import {GET_USER,FOLLOW_USER,CREATE_USER,GET_FRIENDS,UNFOLLOW_USER}  from '../constants/userConstants'

const INITIAL_STATE = {
    users:[]
}

const userReducer= ( state=INITIAL_STATE,action)=>{
    switch(action.type){
        
        case GET_USER:
            return{
                user:action.payload
            }
        case GET_FRIENDS:
              return{
                ...state,
                  user:action.payload
              }
       
        case CREATE_USER:
                return{
                    users:[...state.users,action.payload]
                }
         case FOLLOW_USER:
                    return {
                      ...state,
                      user: {
                        ...state.user,
                        followings: [...state.user.followings, action.payload],
                      },
                    };
          case UNFOLLOW_USER:
                    return {
                      ...state,
                      user: {
                        ...state.user,
                        followings: state.user.followings.filter(
                          (following) => following !== action.payload
                        ),
                      },
                    };
        default:
            return state
    }
}
export default userReducer;