import React from "react";
import { useHistory, Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { object, string } from "yup";
import { TextField, FormGroup, Container, Button, Alert } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box } from "@mui/system";
/** Login form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls login function prop
 * - redirects to / route
 *if error alerts user
 * Routes -> LoginForm
 * Routed as /login
 */

function LoginForm({ login }) {
  const history = useHistory();

  const LoginSchema = object({
    username: string().required().min(3).max(15),
    password: string().required().min(5).max(20),
  });
  //send data to api
  async function handleSubmit(values) {
    let result = await login(values);
    if (result.success) {
      //successful go to home page else alert user
      toast.success("Logging in...", {
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
      <h1 className="display-5 mb-3">Login</h1>

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
        {/* //alerts if user has clicked and not typed anything and if what typed does not meet schema */}
        {({ errors, touched }) => (
          <Container maxWidth="xs">
            <Form>
              <FormGroup className="mb-2">
                <Field
                  id="username"
                  as={TextField}
                  name="username"
                  type="text"
                  label="Username"
                />

                {errors.username && touched.username ? (
                  <Alert severity="error">{errors.username}</Alert>
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
                Login
              </Button>
            </Form>
            <h5 className="text-muted">
              No account? <Link to="/signup">sign up here</Link>
            </h5>
          </Container>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;
