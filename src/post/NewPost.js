import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";
import NostalgiaApi from "../api";
import UserContext from "../auth/UserContext";
/** Login form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls login function prop
 * - redirects to /companies route
 *
 * Routes -> LoginForm -> Alert
 * Routed as /login
 */

function NewPost() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const history = useHistory();
  const [formData, setFormData] = useState({
    title: "",
    url: "",
  });
  const [decade, setDecade] = useState("1");
  let username = currentUser.username;
  const [formErrors, setFormErrors] = useState([]);
  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      let result = await NostalgiaApi.postPost({
        ...formData,
        decade_id: parseInt(decade),
      });
      let currentUser = await NostalgiaApi.getUser(username);
      setCurrentUser(currentUser);
      history.push(`/decade/${parseInt(decade)}`);
    } catch (errors) {
      setFormErrors({ success: false, errors });
      console.log(formErrors);
    }
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }
  const handleChangeSelect = (event) => {
    setDecade(event.target.value);
  };
  return (
    <>
      <h2 className="mb-3">New Post/Memory</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Image URL</label>
          <input
            name="url"
            className="form-control"
            value={formData.url}
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
        <div className="form-group">
          <label>
            Decade:
            <select value={decade} onChange={handleChangeSelect}>
              <option name="1960s" value="1">
                1960s
              </option>
              <option name="1970s" value="2">
                1970s
              </option>
              <option name="1980s" value="3">
                1980s
              </option>
              <option name="1990s" value="4">
                1990s
              </option>
              <option name="2000s" value="5">
                2000s
              </option>
            </select>
          </label>
        </div>
        {formErrors.length ? (
          <Alert type="danger" messages={formErrors} />
        ) : null}

        <button
          type="submit"
          className="btn btn-primary float-right"
          onSubmit={handleSubmit}
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default NewPost;
