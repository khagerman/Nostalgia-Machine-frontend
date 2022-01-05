import React, { useState, useContext } from "react";

import NostalgiaApi from "../api";
import UserContext from "../auth/UserContext";
import { Card, FormGroup, TextField, Button, Alert } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { object, string } from "yup";
export default function EditPost({
  id,
  toggle,
  title,
  url,

  updatePost,
}) {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  /**
   *EditPost component

   *form to edit post if user is author
*/

  //shows or hides edit form
  let handleClick = () => {
    toggle();
  };

  let username = currentUser?.username;

  //function to handle editing/patching post
  // sends information to api
  async function handleSubmit(values) {
    try {
      let post = await NostalgiaApi.patchPost(id, {
        ...values,
      });
      // hides edit form
      toggle();
      // updates current user to trigger update so changes are shown
      let currentUser = await NostalgiaApi.getUser(username);
      setCurrentUser(currentUser);
      updatePost(post);
    } catch (errors) {
      console.error(errors);
    }
  }
  // schema to check edit and provide feedback to user
  const PostSchema = object({
    url: string().required().url(),
    title: string().required().min(1).max(100),
  });
  return (
    <Card sx={{ maxWidth: 345 }}>
      <span className="close" onClick={handleClick}>
        &times;
      </span>
      <Formik
        initialValues={{
          url: url,
          title: title,
        }}
        validationSchema={PostSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <FormGroup>
              <label>Image URL</label>
              <Field
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
              <label>Post Text</label>
              <Field
                name="title"
                id="title"
                className="form-control"
                as={TextField}
              />
              {errors.title && touched.title ? (
                <Alert severity={"error"}>{errors.title}</Alert>
              ) : null}
            </FormGroup>
            <Button variant="contained" type="submit" onSubmit={handleSubmit}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
}
