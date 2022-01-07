import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import NostalgiaApi from "../api";
import UserContext from "../auth/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
/** private routes
 *
 * In routing component, use these instead of <Route ...>. This component
 * will check if there is a valid current user and only continues to the
 * route if so. If no user is present, redirects to login form.
 */

function PrivateRoute({ exact, path, children }) {
  const { currentUser } = useContext(UserContext);
  //if user is not logged in and tries to go to private route will alert user and redirect
  //to login page
  console.debug(
    "PrivateRoute",
    "exact=",
    exact,
    "path=",
    path,
    "currentUser=",
    currentUser
  );
  if (!NostalgiaApi.token) {
    console.log("currentUser", currentUser);
    toast.error("Please login to continue", {
      toastId: 1234,
      position: toast.POSITION.TOP_CENTER,
    });

    return (
      <>
        <Redirect to="/login" />;
      </>
    );
  }

  return (
    <Route exact={exact} path={path}>
      {children}
    </Route>
  );
}

export default PrivateRoute;
