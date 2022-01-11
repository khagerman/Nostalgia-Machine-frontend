import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import NostalgiaApi from "../api";

import NotFound from "../navigation/NotFound";
import UserContext from "../auth/UserContext";
import EditPostDetail from "./EditPostDetail";

import "react-toastify/dist/ReactToastify.css";
import { Modal, IconButton, Button } from "@mui/material";
import CommentSection from "../comment/CommentSection";
import LoadingSpinner from "../common/LoadingSpinner";
function PostDetail() {
  const { id } = useParams();

  const [post, setPost] = useState([]);
  const history = useHistory();
  const { currentUser, likedIds, setCurrentUser, handleLike } =
    useContext(UserContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  /**
   *PostDetail component
*shows detail of post
*shows post title, username,  picture, and comments

*shows edit button and delete if posted by currentUser
renders popup of edit form if clicked on
shows like button if not posted by currentUser
*/

  //get post data on load
  useEffect(() => {
    async function getData() {
      try {
        let data = await NostalgiaApi.getPost(id);
        setPost(data);
      } catch (e) {
        <NotFound />;
      }
    }
    getData();
  }, [id, open]);
  const comments = post.comments;
  // show loading spinner if content not loaded
  if (!post || !comments) return <NotFound />;

  //delete post when clicked on and current user
  async function handleDeletePost(postId, username) {
    try {
      await NostalgiaApi.deletePost(postId);
      let currentUser = await NostalgiaApi.getUser(username);
      setCurrentUser(currentUser);
      history.push(`/`);
    } catch (errors) {
      console.error(" failed", errors);
      return { success: false, errors };
    }
  }

  // update data when new comment added
  const handleNewPost = () => {
    async function getData() {
      let data = await NostalgiaApi.getPost(id);
      setPost(data);
    }
    getData();
  };
  //logic to edit comment, only visable if user created comment
  async function handleEdit(postId, newData, id) {
    try {
      await NostalgiaApi.patchComment(postId, newData, id);
      let data = await NostalgiaApi.getPost(postId);
      setPost(data);
      return { success: true };
    } catch (errors) {
      console.error(" failed", errors);
      return { success: false, errors };
    }
  }

  //logic to delete comment, only visable if user created comment
  async function handleDelete(postId, id) {
    try {
      await NostalgiaApi.deleteComment(postId, id);
      let data = await NostalgiaApi.getPost(postId);
      setPost(data);
      return { success: true };
    } catch (errors) {
      console.error(" failed", errors);
      return { success: false, errors };
    }
  }

  return (
    <div>
      <h1 className="display-5 m-4 title">{post.title}</h1>

      <Modal open={open} onClose={handleClose}>
        <EditPostDetail id={id} url={post.url} title={post.title} />
      </Modal>

      <div className="container">
        <img
          className="img-thumbnail"
          src={post.url}
          onError={(e) => {
            e.target.src = "https://i.imgur.com/sjDBHUW.jpg";
          }}
        ></img>
      </div>

      <p className="author lead mt-1"> Posted by: {post.username}</p>

      <div>
        {post?.username !== currentUser?.username ? (
          <IconButton onClick={() => handleLike(+id)}>
            {likedIds.has(+id) ? (
              <i className="fas fa-heart"></i>
            ) : (
              <i className="far fa-heart"></i>
            )}
          </IconButton>
        ) : (
          <>
            <IconButton onClick={handleOpen}>
              <i className="fas fa-edit"></i>
            </IconButton>
            <IconButton
              onClick={() => handleDeletePost(id, currentUser.username)}
            >
              <i className="fas fa-trash-alt"></i>
            </IconButton>
          </>
        )}
      </div>
      <div>
        <Button color="secondary" variant="outlined" onClick={history.goBack}>
          <i class="fas fa-backward"></i>&nbsp; Go Back
        </Button>
      </div>
      <CommentSection
        id={id}
        comments={comments}
        handleNewPost={handleNewPost}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}
export default PostDetail;
