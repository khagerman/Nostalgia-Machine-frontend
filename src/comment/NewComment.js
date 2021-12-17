import React, { useState } from "react";
import Alert from "../common/Alert";
import NostalgiaApi from "../api";
import {} from "react-dom/cjs/react-dom.development";
export default function NewComment({ postId, onUpdate }) {
  const [formData, setFormData] = useState({
    text: "",
  });
  const [formErrors, setFormErrors] = useState(false);
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
      <p>{formErrors ? <p> {"Comment cannot be blank"} </p> : null}</p>
      <form className="form-inline" onSubmit={handleSubmit}>
        <label htmlFor="text">Comment</label>
        <input
          type="text"
          name="text"
          id="text"
          value={formData.text}
          onChange={handleChange}
        />
        <button type="submit" onSubmit={handleSubmit}>
          Add
        </button>
      </form>
    </div>
  );
}
