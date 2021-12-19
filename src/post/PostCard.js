import React, { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import NostalgiaApi from "../api";
import PopUpEditPost from "./EditPost";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function PostCard({ id, url, title, username, handleLike }) {
  const { currentUser, likedIds, setLikedIds, setCurrentUser } =
    useContext(UserContext);
  const [show, setShow] = useState(false);
  const [updatedPost, updatePost] = useState(null);
  const togglePop = () => {
    setShow(!show);
  };

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
        <PopUpEditPost
          id={id}
          toggle={togglePop}
          url={url}
          title={title}
          updatedPost={updatedPost}
          updatePost={updatePost}
        />
      ) : (
        <Card sx={{ maxWidth: 345 }}>
          <Link to={`/post/${id}`}>
            <CardMedia component="img" height="200" image={url} alt={title} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Posted by: {username}
              </Typography>
            </CardContent>
          </Link>

          {username !== currentUser?.username ? (
            <button onClick={handleLike}>
              {likedIds.has(id) && currentUser ? (
                <i class="fas fa-heart"></i>
              ) : (
                <i class="far fa-heart"></i>
              )}
            </button>
          ) : (
            <>
              <button onClick={togglePop}>
                Edit
                <span class="fas fa-edit"></span>
              </button>
              <button onClick={() => handleDelete(id)}>
                Delete
                <i class="fas fa-trash-alt"></i>
              </button>
            </>
          )}
        </Card>
      )}
    </div>
  );
}
