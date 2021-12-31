import React, { useState, useContext } from "react";

import NostalgiaApi from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../auth/UserContext";
import { Alert, Button } from "@mui/material";
// import {} from "react-dom/cjs/react-dom.development";

/**
   *New Comment form for post

   *Rendered on post detail page

   *visible only to those logged in

   
   */

export default function NewComment({ postId, onUpdate }) {
  const [formData, setFormData] = useState({
    text: "",
  });
  const [formErrors, setFormErrors] = useState(false);
  const { currentUser } = useContext(UserContext);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      let result = await NostalgiaApi.postComment(postId, formData);
      onUpdate();
      setFormData({
        text: "",
      });
      setFormErrors(false);
    } catch (errors) {
      // set errors to true so toast popup shows up
      setFormErrors(true);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((fData) => ({
      ...fData,

      [name]: value,
    }));
  };
  return (
    <div>
      {formErrors ? (
        <Alert severity="warning">Comment cannot be blank!</Alert>
      ) : null}
      <form onSubmit={handleSubmit}>
        <label htmlFor="text">Comment</label>
        <input
          type="text"
          name="text"
          id="text"
          value={formData.text}
          onChange={handleChange}
        />
        <Button type="submit" onSubmit={handleSubmit}>
          Add
        </Button>
      </form>
    </div>
  );
}
