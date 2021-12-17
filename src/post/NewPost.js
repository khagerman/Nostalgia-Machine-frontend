import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";
import NostalgiaApi from "../api";
import UserContext from "../auth/UserContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string } from "yup";
import {
  TextField,
  FormGroup,
  Container,
  Button,
  Select,
  Box,
} from "@mui/material";
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

  const [decade, setDecade] = useState("1");
  let username = currentUser?.username;
  // const [formErrors, setFormErrors] = useState([]);
  async function handleSubmit(data) {
    try {
      let result = await NostalgiaApi.postPost(data);
      let currentUser = await NostalgiaApi.getUser(username);
      setCurrentUser(currentUser);
      history.push(`/decade/${parseInt(decade)}`);
    } catch (errors) {
      console.log(errors);
    }
  }

  /** Update form data field */
  // function handleChange(evt) {
  //   const { name, value } = evt.target;
  //   setFormData((data) => ({ ...data, [name]: value }));
  // }
  const handleChangeSelect = (event) => {
    setDecade(event.target.value);
  };

  const PostSchema = object({
    url: string().required().url(),
    title: string().required().min(1).max(100),
  });
  return (
    <>
      <h2 className="mb-3">New Post/Memory</h2>
      <Formik
        initialValues={{
          url: "",
          title: "",
        }}
        validationSchema={PostSchema}
        onSubmit={(values) => {
          handleSubmit({ ...values, decade_id: parseInt(decade) });
        }}
      >
        {({ errors, touched }) => (
          <Container maxWidth="xs">
            <Form>
              <FormGroup>
                <Field
                  id="url"
                  name="url"
                  className="form-control"
                  label="Image URL"
                  as={TextField}
                />
                {errors.url && touched.url ? (
                  <div style={{ color: "red" }}>{errors.url}</div>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Field
                  name="title"
                  id="title"
                  label="Post Text"
                  className="form-control"
                  as={TextField}
                />
                {errors.title && touched.title ? (
                  <div style={{ color: "red" }}>{errors.title}</div>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Field
                  label="Decade"
                  value={decade}
                  as="select"
                  onChange={handleChangeSelect}
                >
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
                </Field>
              </FormGroup>
              {/* {formErrors.length ? (
              <Alert type="danger" messages={formErrors} />
            ) : null} */}

              <Button variant="contained" type="submit" onSubmit={handleSubmit}>
                Submit
              </Button>
            </Form>
          </Container>
        )}
      </Formik>
    </>
  );
}

export default NewPost;
