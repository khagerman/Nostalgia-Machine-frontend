import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string } from "yup";
import { TextField, FormGroup, Container, Button } from "@mui/material";
/** Signup form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls signup function prop
 * - redirects to /companies route
 *
 * Routes -> SignupForm -> Alert
 * Routed as /signup
 */

function SignupForm({ signup }) {
  const history = useHistory();
  const SignupSchema = object({
    username: string().required().min(3).max(15),
    password: string().required().min(5).max(20),
  });
  async function handleSubmit(values) {
    let result = await signup(values);
    if (result.success) {
      history.push("/");
    } else {
      alert(result.errors);
    }
  }
  return (
    <div>
      <h1>Signup</h1>

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
// const [formData, setFormData] = useState({
//   username: "",
//   password: "",
// });
// const [formErrors, setFormErrors] = useState([]);

// /** Handle form submit:
//  *
//  * Calls login func prop and, if successful, redirect to /companies.
//  */

// async function handleSubmit(e) {
//   e.preventDefault();
//   let result = await signup(formData);
//   if (result.success) {
//     history.push("/");
//   } else {
//     setFormErrors(result.errors);
//   }
// }

// /** Update form data field */
// function handleChange(evt) {
//   const { name, value } = evt.target;
//   setFormData((data) => ({ ...data, [name]: value }));
// }

// return (
//   <>
//     <h2 className="mb-3">Sign Up</h2>

//     <form onSubmit={handleSubmit}>
//       <div className="form-group">
//         <label>Username</label>
//         <input
//           name="username"
//           className="form-control"
//           value={formData.username}
//           onChange={handleChange}
//         />
//       </div>
//       <div className="form-group">
//         <label>Password</label>
//         <input
//           type="password"
//           name="password"
//           className="form-control"
//           value={formData.password}
//           onChange={handleChange}
//         />
//       </div>
//       {formErrors.length ? (
//         <Alert type="danger" messages={formErrors} />
//       ) : null}

//       <button
//         type="submit"
//         className="btn btn-primary float-right"
//         onSubmit={handleSubmit}
//       >
//         Submit
//       </button>
//     </form>
//   </>
// );

export default SignupForm;
