import React, { useState } from "react";
import Alert from "../common/Alert";
import NostalgiaApi from "../api";
export default function PopUpEditPost({ toggle, title, url }) {
  let handleClick = () => {
    toggle();
  };
  const [formData, setFormData] = useState({
    title: title,
    url: url,
  });
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }
  const [formErrors, setFormErrors] = useState([]);
  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      await NostalgiaApi.editPost({
        ...formData,
      });
    } catch (errors) {
      setFormErrors({ success: false, errors });
      console.log(formErrors);
    }
  }
  return (
    <div className="modal">
      <div className="modal_content">
        <span className="close" onClick={handleClick}>
          &times;
        </span>
        <form>
          <div className="form-group">
            <label>Image URL</label>
            <input
              name="url"
              className="form-control"
              value={url}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Post Text</label>
            <input
              name="title"
              className="form-control"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary float-right"
            onSubmit={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
