import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import NostalgiaApi from "../api";
import UserContext from "../auth/UserContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string } from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  TextField,
  FormGroup,
  Container,
  Button,
  Select,
  Box,
  Alert,
} from "@mui/material";
/**
   *NewPosr component

   *form to create new post
*/

function NewPost() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const history = useHistory();

  // seperate state for select input
  const [decade, setDecade] = useState("1");
  let username = currentUser?.username;

  async function handleSubmit(data) {
    try {
      // creates post and updates current user to update users profile
      let result = await NostalgiaApi.postPost(data);
      let currentUser = await NostalgiaApi.getUser(username);
      setCurrentUser(currentUser);
      // goes to decade page of given decade of post
      history.push(`/decade/${parseInt(decade)}`);
    } catch (errors) {
      console.log(errors);
      // alerts of errors if any
      toast.error(errors[0], {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  // update seperate state for select input
  const handleChangeSelect = (event) => {
    setDecade(event.target.value);
  };

  //schema for post
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
                  <Alert severity={"error"}>{errors.url}</Alert>
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
                  <Alert severity={"error"}>{errors.title}</Alert>
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
