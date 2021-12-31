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
  async function handleSubmit(values) {
    let result = await signup(values);
    if (result.success) {
      history.push("/");
    } else {
      console.log(result.errors);
      toast.error(result.errors[0], {
        position: toast.POSITION.TOP_CENTER,
      });
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
                  <Alert severity={"error"}>{errors.username}</Alert>
                ) : null}

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
              <br></br>
              <Button variant="contained" color="secondary" type="submit">
                Signup
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
