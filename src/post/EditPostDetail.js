import React, { useState, useContext } from "react";

import NostalgiaApi from "../api";

import UserContext from "../auth/UserContext";

import { Card, FormGroup, TextField, Button } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { object, string } from "yup";
import "./PostDetail.css";
export default function EditPost({
  id,
  toggle,
  title,
  url,

  updatePost,
}) {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  /**
   *EditPost component for post detail page

   *form to edit post if user is author
*/

  //shows or hides edit form

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
    <Card className="Card">
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
              <Field
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
                className="form-control"
                as={TextField}
                label="Post Text"
              />
              {errors.title && touched.title ? (
                <div style={{ color: "red" }}>{errors.title}</div>
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
