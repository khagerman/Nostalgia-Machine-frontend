import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import DecadePage from "../decade/DecadePage";

import PostDetail from "../post/PostDetail";
import LoginForm from "../auth/LoginForm";
import NewPost from "../post/NewPost";
import SignupForm from "../auth/SignupForm";
import PrivateRoute from "./PrivateRoute";
import Profile from "../profile/Profile";
/** Site-wide routes.
 *
 * Parts of site should only be visitable when logged in. Those routes are
 * wrapped by <PrivateRoute>, which is an authorization component.
 *
 * Visiting a non-existant route redirects to the homepage.
 */

function Routes({ login, signup, userLikes }) {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>

        <Route exact path="/login">
          <LoginForm login={login} />
        </Route>

        <Route exact path="/signup">
          <SignupForm signup={signup} />
        </Route>

        <Route exact path="/decade/:decadeId">
          <DecadePage />
        </Route>
        <PrivateRoute exact path="/post/new">
          <NewPost />
        </PrivateRoute>
        <Route exact path="/post/:id">
          <PostDetail />
        </Route>

        <PrivateRoute path="/profile">
          <Profile />
        </PrivateRoute>

        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default Routes;
