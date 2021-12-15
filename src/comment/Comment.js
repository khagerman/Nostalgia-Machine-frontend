import React, { useContext, useState } from "react";
import NostalgiaApi from "../api";
import UserContext from "../auth/UserContext";
import Alert from "../common/Alert";
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
  const [formErrors, setFormErrors] = useState([]);
  const handleChange = (event) => {
    setComment(event.target.value);
  };

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
      setFormErrors({ success: false, errors });
      console.log(formErrors);
    }
  }
  let edit = (
    <form className="form-inline" onSubmit={handleSubmit}>
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
  // TODO ADDING TOGGLE TO SHOW INPUT OR NOT
  return (
    <div>
      <ul>
        <li>{username}</li>
        {toggle ? edit : <li>{text}</li>}
      </ul>
      {username === currentUser?.username ? (
        <>
          <button
            onClick={() => {
              setToggle(true);
            }}
          >
            <i class="fas fa-edit"></i>
          </button>
          <button onClick={() => handleDelete(postId, commentId)}>
            <i class="fas fa-trash-alt"></i>
          </button>
          {formErrors.length ? (
            <Alert type="danger" messages={formErrors} />
          ) : null}
        </>
      ) : (
        ""
      )}
    </div>
  );
}
