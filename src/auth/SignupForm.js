import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Formik, Form, Field } from "formik";
import { object, string } from "yup";
import { TextField, FormGroup, Container, Button, Alert } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
/** Signup form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls signup function prop
 * - redirects to / route
 *if error alerts user

 * Routed as /signup
 */

function SignupForm({ signup }) {
  const history = useHistory();
  const SignupSchema = object({
    username: string().required().min(3).max(15),
    password: string().required().min(5).max(20),
  });
  //send data to api, if successful go to homepage, else alert user
  async function handleSubmit(values) {
    let result = await signup(values);
    if (result.success) {
      toast.success("Creating account...", {
        position: toast.POSITION.TOP_CENTER,
      });
      history.push("/");
    } else {
      console.error(result.errors);
      toast.error(result.errors[0], {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }
  return (
    <div>
      <h1 className="display-5" mb-3>
        Signup
      </h1>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ errors, touched }) => (
          <Container maxWidth="xs">
            <Form>
              <FormGroup className="mb-2">
                <Field
                  id="username"
                  name="username"
                  label="Username"
                  as={TextField}
                />
                {errors.username && touched.username ? (
                  <Alert severity={"error"}>{errors.username}</Alert>
                ) : null}
              </FormGroup>

              <FormGroup>
                <Field
                  id="password"
                  as={TextField}
                  name="password"
                  type="password"
                  label="Password"
                />
                {errors.password && touched.password ? (
                  <Alert severity={"error"}>{errors.password}</Alert>
                ) : null}
              </FormGroup>

              <Button
                className="m-3"
                variant="contained"
                color="secondary"
                type="submit"
              >
                Signup
              </Button>
            </Form>
          </Container>
        )}
      </Formik>
    </div>
  );
}

export default SignupForm;
