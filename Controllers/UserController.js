const User = require('../Models/User');


exports.getUser =async (req, res) => {
    try {
      const userId = req.params.userId
      const user = await User.findById(userId)
      .populate({path:'followings',select:'username',model:'User'})
      .populate({path:'followers',select:'username',model:'User'})
     
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  };
 
 exports.followUser = async(req,res)=>{
    if (req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
              await user.updateOne({ $push: { followers: req.body.userId } });
              await currentUser.updateOne({ $push: { followings: req.params.id } });
              res.status(200).json("user has been followed");
            } else {
              res.status(403).json("you allready follow this user");
            }
        }catch(err){
           res.status(500).json(err); 
        }
    }else {
        res.status(403).json("you cant follow yourself");
    }
 }

 exports.unfollowUser = async(req,res)=>{
    if (req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
              await user.updateOne({ $pull: { followers: req.body.userId } });
              await currentUser.updateOne({ $pull: { followings: req.params.id } });
              res.status(200).json("user has been unfollowed");
            } else {
              res.status(403).json("you allready unfollow this user");
            }
        }catch(err){
           res.status(500).json(err); 
        }
    }else {
        res.status(403).json("you cant unfollow yourself");
    }
 }

exports.followingsList= async(req,res)=>{
    try {
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
          user.followings.map((friendId) => {
            return User.findById(friendId);
          })
        );
        let friendList = [];
        friends.map((friend) => {
          const { _id, username, profilePicture } = friend;
          friendList.push({ _id, username, profilePicture });
        });
        res.status(200).json(friendList)
      } catch (err) {
        res.status(500).json(err);
      }
}
exports.createPost = async(req,res)=>{
 
  try {
    const newPost = new Post();
    newPost.userId=req.params.userId
    
    newPost.desc=req.body.desc
    newPost.img=req.body.img
    const savedPost = await newPost.save();
   
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
}

//   exports.updateUser =async (req, res) => {
//     if (req.body.userId === req.params.id || req.body.isAdmin) {
//         if (req.body.password) {
//           try {
//             const salt = await bcrypt.genSalt(10);
//             req.body.password = await bcrypt.hash(req.body.password, salt);
//           } catch (err) {
//             return res.status(500).json(err);
//           }
//         }
//         try {
//           const user = await User.findByIdAndUpdate(req.params.id, {
//             $set: req.body,
//           });
//           res.status(200).json("Account has been updated");
//         } catch (err) {
//           return res.status(500).json(err);
//         }
//       } else {
//         return res.status(403).json("You can update only your account!");
//       }
//     };