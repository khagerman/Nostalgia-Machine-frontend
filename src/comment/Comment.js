import React, { useContext, useState } from "react";

import UserContext from "../auth/UserContext";
import "./Comment.css";
import {
  IconButton,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  // ListItemAvatar,
  // Avatar,
} from "@mui/material";
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
    <form onSubmit={handleSubmit}>
      <label htmlFor="text"> Add a Comment</label>
      <input
        type="text"
        name="text"
        id="text"
        value={comment}
        onChange={handleChange}
      />
      <button type="submit" onSubmit={handleSubmit}>
        edit
      </button>
    </form>
  );

  // function stringAvatar(name) {
  //   return {
  //     sx: {
  //       bgcolor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
  //     },
  //     children: `${name[0]}`,
  //   };
  // }
  return (
    <>
      <div className="m-7 Comment">
        {/* <ListItemAvatar>
          <Avatar {...stringAvatar(username)} />
        </ListItemAvatar> */}

        {username}
        {/* if comment is by user allow user to edit/delete */}
        {username === currentUser?.username ? (
          <>
            <IconButton
              onClick={() => {
                setToggle(true);
              }}
            >
              <i className="fas fa-edit"></i>
            </IconButton>
            {/* delete post */}
            <IconButton onClick={() => handleDelete(postId, commentId)}>
              <i className="fas fa-trash-alt"></i>
            </IconButton>
          </>
        ) : (
          ""
        )}

        {/* // if editing show form else show text
         */}
        {
          <>
            <div
              className="Comment"
              // sx={{ display: "inline" }}
              // component="span"
              // variant="body2"
              // color="text.primary"
            >
              {toggle ? edit : text}
            </div>
          </>
        }
      </div>
    </>
  );
}
