import React, { useContext, useState } from "react";

import UserContext from "../auth/UserContext";

import {
  IconButton,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  ListItemAvatar,
  Avatar,
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

   *Rendered on post detail page

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
      setToggle(false);
    } catch (errors) {
      setFormErrors(true);
    }
  }
  let edit = (
    <form onSubmit={handleSubmit}>
      <label htmlFor="text">Comment</label>
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

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: Math.floor(Math.random() * 16777215).toString(16),
      },
      children: `${name[0]}`,
    };
  }
  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar {...stringAvatar(username)} />
        </ListItemAvatar>

        <ListItemText
          primary={toggle ? edit : text}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {username}
              </Typography>
              {username === currentUser?.username ? (
                <span>
                  <IconButton
                    onClick={() => {
                      setToggle(true);
                    }}
                  >
                    <i className="fas fa-edit"></i>
                  </IconButton>
                  <IconButton onClick={() => handleDelete(postId, commentId)}>
                    <span className="fas fa-trash-alt"></span>
                  </IconButton>
                </span>
              ) : (
                ""
              )}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
}
