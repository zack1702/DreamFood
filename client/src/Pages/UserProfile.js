
import React from 'react'
import {useDispatch,useSelector } from 'react-redux'
import Share from '../Components/Share'
import Post from '../Components/Post'
import { getUser,getUserPosts} from '../redux/actions/userAction'
import './UserProfile.css'

import {  useEffect, useState } from "react";
import axios from "axios";


const UserProfile = ({match}) => {
  
    const dispatch = useDispatch()
     const {user} = useSelector(state=>state.users)

    const userId= match.params.userId
    // const [userPost, setUserPost] = useState({});
    
    useEffect(() => {
            dispatch(getUser(userId))
            // dispatch(getUserPosts(userId))
       }, [dispatch,userId]);

       
   
    return (
      <>
      <div className='profile__container'>
            <div className='profile__left'>
              <Share  />
               {/* <Post post={userPost}/>  */}
            </div>
           
            <div className='profile__center'>
                  <h5>{user?.username}</h5>

            </div>

            <div className='profile__right'>
                <div className="profileRightTop">
                  <div className="profileCover">
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
                   <h5>{user?.followings.map(f=>f?.username)}</h5>
                       
                    </div>   
                          
  
    </>
    
    
   
    )
}

export default UserProfile
