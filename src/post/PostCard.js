import React, { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import NostalgiaApi from "../api";
import EditPost from "./EditPost";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PostCard({ id, url, title, username, handleLike }) {
  const { currentUser, likedIds, setLikedIds, setCurrentUser } =
    useContext(UserContext);
  const [show, setShow] = useState(false);
  const [updatedPost, updatePost] = useState(null);
  //todo seperate card for profile?
  /**
   *PostCard component
*card for each post
*shows post title and some of picture
*rendered on user profile and decade page 
*if clicked on goes to detail page
*shows edit button and delete if posted by currentUser
shows like button if not posted by currentUser
*/

  // show or hide update post form
  const togglePop = () => {
    setShow(!show);
  };

  //
  async function handleDelete(postId) {
    try {
      await NostalgiaApi.deletePost(postId);
      let currentUser = await NostalgiaApi.getUser(username);
      setCurrentUser(currentUser);
      return { success: true };
    } catch (errors) {
      console.error(" failed", errors);
      return { success: false, errors };
    }
  }
  // async function handleEdit(postId) {
  //   try {
  //     await NostalgiaApi.editPost(postId);
  //     return { success: true };
  //   } catch (errors) {
  //     console.error("login failed", errors);
  //     return { success: false, errors };
  //   }
  // }
  return (
    <div>
      {show ? (
        <EditPost
          id={id}
          toggle={togglePop}
          url={url}
          title={title}
          updatedPost={updatedPost}
          updatePost={updatePost}
        />
      ) : (
        <Card>
          <CardActionArea
            sx={{ maxWidth: 345 }}
            component={Link}
            to={`/post/${id}`}
          >
            <CardMedia component="img" height="300" image={url} alt={title} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {/* Posted by: {username} */}
              </Typography>
            </CardContent>
          </CardActionArea>
          {username !== currentUser?.username ? (
            <IconButton onClick={handleLike}>
              {/* check if user has already liked */}
              {likedIds.has(id) && currentUser ? (
                <i className="fas fa-heart"></i>
              ) : (
                <i className="far fa-heart"></i>
              )}
            </IconButton>
          ) : (
            <>
              <IconButton onClick={togglePop}>
                <i color="primary" className="fas fa-edit"></i>
              </IconButton>
              <IconButton onClick={() => handleDelete(id)}>
                <i color="danger" className="fas fa-trash-alt"></i>
              </IconButton>
            </>
          )}
        </Card>
      )}
    </div>
  );
}
