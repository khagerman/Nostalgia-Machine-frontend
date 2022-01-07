import React, { useContext, useState } from "react";

import UserContext from "../auth/UserContext";
import "./Comment.css";
import { IconButton, Button } from "@mui/material";
export default function Comment({
  postId,
  username,
  commentId,
  text,
  handleDelete,
  handleEdit,
}) {
  const { currentUser } = useContext(UserContext);
  const [comment, setComment] = useState(text);
  const [toggle, setToggle] = useState(false);
  const [formErrors, setFormErrors] = useState(false);
  const handleChange = (event) => {
    setComment(event.target.value);
  };
  /**
   *Comment component for post

   *Rendered on CommentSection

   *shows edit of delete button if comment belongs to user

   *renders new comment form if user logged in
   */

  //  submit new comment, shows error if blank
  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      handleEdit(
        postId,
        {
          text: comment,
        },
        commentId
      );
      //hide form if edit successful
      setToggle(false);
    } catch (errors) {
      setFormErrors(true);
    }
  }
  let edit = (
    <form className="form-control" onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="text"
          id="text"
          value={comment}
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          size="small"
          type="submit"
          onSubmit={handleSubmit}
        >
          edit
        </Button>
      </div>
    </form>
  );

  return (
    <div className=" shadow-sm Comment">
      {/* if comment is by user allow user to edit/delete */}
      {username === currentUser?.username ? (
        <div className="IconBtn">
          <IconButton
            onClick={() => {
              setToggle(true);
            }}
          >
            <i className="fas fa-edit fa-xs"></i>
          </IconButton>
          {/* delete post */}
          <IconButton onClick={() => handleDelete(postId, commentId)}>
            <i className="fas fa-trash-alt fa-xs"></i>
          </IconButton>
        </div>
      ) : (
        ""
      )}

      {/* // if editing show form else show text
       */}
      <div className="blockquote">{toggle ? edit : text}</div>
      <div className="blockquote-footer">{username}</div>
    </div>
  );
}
