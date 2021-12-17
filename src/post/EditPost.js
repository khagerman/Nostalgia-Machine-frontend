import React, { useState, useContext } from "react";
import Alert from "../common/Alert";
import NostalgiaApi from "../api";
import { useHistory } from "react-router-dom";
import UserContext from "../auth/UserContext";
import { ToastContainer, toast } from "react-toastify";
import { Container, Card, FormGroup, TextField, Button } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string } from "yup";
export default function PopUpEditPost({
  id,
  toggle,
  title,
  url,
  updatedPost,
  updatePost,
}) {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  let handleClick = () => {
    toggle();
  };

  let username = currentUser?.username;

  async function handleSubmit(values) {
    try {
      let post = await NostalgiaApi.patchPost(id, {
        ...values,
      });
      toggle();
      let currentUser = await NostalgiaApi.getUser(username);
      setCurrentUser(currentUser);
      updatePost(post);
    } catch (errors) {
      console.log(errors);
    }
  }

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
                <div style={{ color: "red" }}>{errors.url}</div>
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
                <div style={{ color: "red" }}>{errors.title}</div>
              ) : null}
            </FormGroup>
            <Button
              variant="contained"
              type="submit"
              className="btn btn-primary float-right"
              onSubmit={handleSubmit}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
}
