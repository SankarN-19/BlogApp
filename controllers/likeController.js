//import the model
const Post = require('../models/postModel');
const Like = require('../models/likemodel');

//like a post
exports.likePost = async(req, res) => {
    try{
        //fetch data from request body
        const {post, user} = req.body;
        //create like object 
        const like = new Like({
            post,user
        });
        //save the new link into the database
        const savedLike = await like.save();

        //find the post by ID,
        //add the new like to its like array
        const updatedPost = await Post.findByIdAndUpdate(post, {$push:{likes: savedLike._id}}, {new: true} )
                            .populate("likes") //populate the likes array with like documents
                            .exec();
        res.json({
        post: updatedPost,   
        });
    }
    catch(error){
        return res.status(500).json({
            error: "Error while liking post",
        });
    }
}

//unlike a post
exports.unlikePost = async(req, res) => {
    try{
        const {post, like} = req.body;
        //find and delete from the like collection
        const deletedLike = await Like.findOneAndDelete({post:post,_id:like});
        //update the Post collection
        const updatedPost = await Post.findByIdAndUpdate(post, {$pull:{likes: deletedLike._id}}, {new: true} );

        res.json({
            post: updatedPost,
        });
    } 
    catch(error){
        return res.status(500).json({
            error: "Error while unliking post",
        });
    }
}