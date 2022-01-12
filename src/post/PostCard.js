import React, { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, IconButton, Modal } from "@mui/material";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import NostalgiaApi from "../api";
import EditPostDetail from "./EditPostDetail";
import "./PostCard.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
export default function PostCard({ id, url, title, username, handleLike }) {
  const { currentUser, likedIds, setLikedIds, setCurrentUser } =
    useContext(UserContext);
  const [show, setShow] = useState(false);
  const [updatedPost, updatePost] = useState(null);

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
  const togglePopUp = () => {
    setShow(!show);
  };

  //
  async function handleDelete(postId) {
    try {
      await NostalgiaApi.deletePost(postId);
      let currentUser = await NostalgiaApi.getUser(username);
      setCurrentUser(currentUser);
      toast.info("Post deleted!", {
        position: toast.POSITION.TOP_CENTER,
      });
      return { success: true };
    } catch (errors) {
      console.error(" failed", errors);
      return { success: false, errors };
    }
  }

  return (
    <div>
      <Card className="Card">
        <Modal className="CardModal m-3" open={show} onClose={togglePopUp}>
          <EditPostDetail
            id={id}
            toggle={togglePopUp}
            url={url}
            title={title}
            updatedPost={updatedPost}
            updatePost={updatePost}
          />
          {/* <Card>hello</Card> */}
        </Modal>

        <CardActionArea
          // sx={{ maxWidth: 345 }}
          component={Link}
          to={`/post/${id}`}
        >
          <CardMedia
            className="img-fluid"
            component="img"
            image={url}
            onError={(e) => {
              e.target.src = "https://i.imgur.com/sjDBHUW.jpg";
            }}
            alt={title}
          />

          {/* <Typography
            className="title"
            gutterBottom
            variant="h6"
            component="div"
          >
            {title}
          </Typography> */}
          <h3 className="title m-2">{title}</h3>
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
            <IconButton onClick={togglePopUp}>
              <i color="primary" className="fas fa-edit"></i>
            </IconButton>
            <IconButton onClick={() => handleDelete(id)}>
              <i color="danger" className="fas fa-trash-alt"></i>
            </IconButton>
          </>
        )}
      </Card>
    </div>
  );
}
