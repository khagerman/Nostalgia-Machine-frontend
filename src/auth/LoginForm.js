import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string } from "yup";
import { TextField, FormGroup, Container, Button } from "@mui/material";

/** Login form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls login function prop
 * - redirects to / route
 *
 * Routes -> LoginForm -> Alert
 * Routed as /login
 */

function LoginForm({ login }) {
  const history = useHistory();

  const LoginSchema = object({
    username: string().required().min(3).max(15),
    password: string().required().min(5).max(20),
  });
  async function handleSubmit(values) {
    let result = await login(values);
    if (result.success) {
      history.push("/");
    } else {
      alert(result.errors);
    }
  }
  return (
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ errors, touched }) => (
          <Container maxWidth="xs">
            <Form>
              <FormGroup>
                <Field
                  id="username"
                  name="username"
                  label="Username"
                  as={TextField}
                />
                {errors.username && touched.username ? (
                  <div style={{ color: "red" }}>{errors.username}</div>
                ) : null}

                <Field
                  id="password"
                  as={TextField}
                  name="password"
                  type="password"
                  label="Password"
                />
                {errors.password && touched.password ? (
                  <div style={{ color: "red" }}>{errors.password}</div>
                ) : null}
              </FormGroup>
              <Button variant="contained" type="submit">
                Login
              </Button>
            </Form>
          </Container>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;
