import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import NostalgiaApi from "../api";
import Comment from "./Comment";
import NewComment from "./NewComment";
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext";
import EditPostDetail from "../post/EditPostDetail";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Alert, Modal, Box, IconButton, List } from "@mui/material";

function CommentSection({
  id,
  comments,
  handleDelete,
  handleNewPost,
  handleEdit,
}) {
  const { currentUser } = useContext(UserContext);
  return (
    <>
      <h3>Comments</h3>
      {currentUser ? (
        <NewComment postId={id} onUpdate={() => handleNewPost()} />
      ) : (
        <Alert severity="info">
          Please <Link to="/login">login</Link> to comment
        </Alert>
      )}
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {comments.length !== 0 ? (
          comments.map((c) => (
            <Comment
              text={c.text}
              key={c.id}
              commentId={c.id}
              postId={id}
              username={c.username}
              handleDelete={() => handleDelete(id, c.id)}
              handleEdit={handleEdit}
            />
          ))
        ) : (
          <h2>no comments yet!</h2>
        )}
      </List>
    </>
  );
}

export default CommentSection;
