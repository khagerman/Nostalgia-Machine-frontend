import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory, Link } from "react-router-dom";

import Comment from "./Comment";
import NewComment from "./NewComment";

import UserContext from "../auth/UserContext";
import "./Comment.css";
import "react-toastify/dist/ReactToastify.css";
import { Alert, Modal, Box, IconButton, List, Container } from "@mui/material";

/**
   *CommentSection component for post

   *Rendered on post detail page
  *renders list of comments for post and new comment form 
   */
function CommentSection({
  id,
  comments,
  handleDelete,
  handleNewPost,
  handleEdit,
}) {
  const { currentUser } = useContext(UserContext);
  return (
    <div className="CommentSection row justify-content-center shadow-m p-3 rounded">
      <h2>Comments</h2>

      {/* if logged in user show comment form else show warning to log in */}
      {currentUser ? (
        <NewComment postId={id} onUpdate={() => handleNewPost()} />
      ) : (
        <Alert severity="info">
          Please <Link to="/login">login</Link> to comment
        </Alert>
      )}
      <div className="col-10">
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
          <em>No comments yet!</em>
        )}
      </div>
    </div>
  );
}

export default CommentSection;
