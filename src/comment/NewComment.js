import React, { useState } from "react";
import Alert from "../common/Alert";
import NostalgiaApi from "../api";
export default function NewComment({ postId, onUpdate }) {
  const [formData, setFormData] = useState({
    text: "",
  });
  const [formErrors, setFormErrors] = useState([]);
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      let result = await NostalgiaApi.postComment(postId, formData);
      onUpdate();
      setFormData({
        text: "",
      });
    } catch (errors) {
      setFormErrors({ success: false, errors });
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
      {formErrors.length ? <Alert type="danger" messages={formErrors} /> : null}
    </div>
  );
}
