import "./RightBar.css";
import React, {  useEffect, useState } from "react";
import {useDispatch,useSelector } from 'react-redux' 
import { Link } from "react-router-dom";

import {followUser,getFriends, unfollowUser} from '../../redux/actions/userAction'

import { Add, Remove } from "@material-ui/icons";


export default function Rightbar({ userId }) {
  
  const dispatch= useDispatch()
  
   const [friends, setFriends] = useState([]);
  const { user  } = useSelector(state=>state.users);
 
  const [followed, setFollowed] = useState(
    []
  );
  useEffect(() => {
   dispatch(getFriends(userId))
  setFriends([friends.username])
  }, [dispatch,userId,friends.username]);

   const handleClick = async () => {
    try {
      if (followed) {
        dispatch(unfollowUser({userId: user._id}))
      } else {
       dispatch(followUser({userId: user._id}))
      }
      setFollowed(!followed);
    } catch (err) {
    }
  };
  
console.log(friends)
  const ProfileRightbar = () => {
    return (
       <>
     
        {/* <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
        {friends.map((friend) => (
            
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.fileName
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            
          ))}
          </div> */}
         
         {/* {user.username !== currentUser.username && (
           <button className="rightbarFollowButton" onClick={handleClick}>
             {followed ? "Unfollow" : "Follow"}
             {followed ? <Remove /> : <Add />}
           </button>
         )} */}
 </>)} 
 
  
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
         <ProfileRightbar /> 
      </div>
    </div>
  );
}