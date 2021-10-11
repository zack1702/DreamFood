
import React,{useEffect} from 'react'
import {useDispatch,useSelector } from 'react-redux'
import RightBar from '../Components/VendeurViews/RightBar'
//import CloseFriend from '../Components/CloseFriend'
import { getUser} from '../redux/actions/userAction'
import './UserProfile.css'




const UserProfile = ({match}) => {
  
    const dispatch = useDispatch()
     const {user} = useSelector(state=>state.users)

    const userId= match.params.userId
  
    
    useEffect(() => {
            dispatch(getUser(userId))
            
       }, [dispatch,userId]);
    
   
    return (
      <>
      <div className='profile__container'>
            <div className='profile__left'>
              {/* <RightBar user = {user} /> */}
            
            </div>
           
            <div className='profile__center'>
            
            </div>

            <div className='profile__right'>
                <div className="profileRightTop">
                  <div className="profileCover">
                  <h5>{user?.username}</h5>
                    <img
                      className="profileUserImg"
                      src={user?.fileName}
                      alt=""
                    />
                    
                  </div>
              </div>
            </div>
      </div>

      {/* <h5>{user?.username}</h5>
                    <hr/>
                    <h5>{user?.email}</h5> 
                    <hr/>
                    <h5>{user?.desc}</h5>         */}
                   <div className="profileRightBottom">
           
                      {/* <RightBar userId={userId} /> */}
                    </div>   
                          
  
    </>
    
    
   
    )
}

export default UserProfile
