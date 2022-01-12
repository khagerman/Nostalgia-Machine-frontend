import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import NostalgiaApi from "../api";
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext";
import { Formik, Form, Field } from "formik";
import { object, string } from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  TextField,
  FormGroup,
  Container,
  Button,
  Alert,
  Select,
  MenuItem,
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
      toast("Post created!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (errors) {
      console.error(errors);
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
      <h2 className="m-3">New Post/Memory</h2>

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
              <FormGroup className="mb-2">
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
              <FormGroup className="mb-2">
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
              <FormGroup className="pb-2">
                <Select
                  id="decade"
                  name="decade"
                  value={decade}
                  onChange={handleChangeSelect}
                  label="decade"
                  className="label"
                  style={{ "aria-label": "Without label" }}
                >
                  <MenuItem name="1960s" value="1">
                    1960s
                  </MenuItem>
                  <MenuItem name="1970s" value="2">
                    1970s
                  </MenuItem>
                  <MenuItem name="1980s" value="3">
                    1980s
                  </MenuItem>
                  <MenuItem name="1990s" value="4">
                    1990s
                  </MenuItem>
                  <MenuItem name="2000s" value="5">
                    2000s
                  </MenuItem>
                </Select>
              </FormGroup>

              <Button
                color="secondary"
                variant="contained"
                type="submit"
                onSubmit={handleSubmit}
              >
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
