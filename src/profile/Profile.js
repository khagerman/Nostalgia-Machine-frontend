import React, { useState, useContext, useEffect, useCallback } from "react";
import PostCard from "../post/PostCard";
import UserContext from "../auth/UserContext";

import { Container, Grid, Box } from "@mui/material";
import LoadingSpinner from "../common/LoadingSpinner";
import "./Profile.css";
function Profile() {
  const {
    currentUser,
    likedIds,

    likes,

    handleLike,
  } = useContext(UserContext);
  /**
   *user profile component
*card for each post
*shows post title, username picture
*rendered on user profile and decade page 
*if clicked on goes to detail page
*shows edit button and delete if posted by currentUser
shows like button if not posted by currentUser
*/
  //show loading spinner if content not loaded
  // if (!currentUser) return <LoadingSpinner />;

  return (
    <Container>
      <h1 className="p-3 display-3"> {currentUser?.username}'s Profile</h1>
      <div className="section">
        <h2 className="display-4">Your likes and fond memories</h2>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {likes?.favorites?.length === 0 ? (
            <Box sx={{ mx: "auto" }}>
              <h4>You haven't liked anything....yet!</h4>
            </Box>
          ) : (
            likes?.favorites?.map((p) => (
              <Grid item xs={2} sm={4} md={4} key={p.id}>
                <PostCard
                  className="profilecard"
                  id={p.id}
                  key={p.id}
                  title={p.title}
                  username={p.username}
                  url={p.url}
                  likedIds={likedIds}
                  handleLike={() => handleLike(p.id)}
                />
              </Grid>
            ))
          )}
        </Grid>
      </div>
      <div className="section">
        <h2 className="display-4">Memories you have shared</h2>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {currentUser?.posts.length === 0 ? (
            <Box sx={{ mx: "auto" }}>
              <h4>You haven't shared anything....yet!</h4>
            </Box>
          ) : (
            currentUser?.posts.map((p) => (
              <Grid item xs={2} sm={4} md={4} key={p.id}>
                <Container>
                  <PostCard
                    id={p.id}
                    username={p.username}
                    key={p.id}
                    title={p.title}
                    url={p.url}
                    handleLike={() => handleLike(p.id)}
                    likedIds={likedIds}
                  />
                </Container>
              </Grid>
            ))
          )}
        </Grid>
      </div>
    </Container>
  );
}
export default Profile;
