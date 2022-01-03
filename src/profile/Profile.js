import React, { useState, useContext, useEffect, useCallback } from "react";
import PostCard from "../post/PostCard";
import UserContext from "../auth/UserContext";
import NostalgiaApi from "../api";
import { Container, Grid, Box } from "@mui/material";
import LoadingSpinner from "../common/LoadingSpinner";
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
  if (!currentUser || !likes || !likedIds) return <LoadingSpinner />;
  console.log(likes);
  return (
    <Container>
      <h1>Hey, {currentUser.username}!</h1>

      <h2>Your likes and fond memories</h2>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {likes.favorites.length === 0 ? (
          <Box sx={{ mx: "auto" }}>
            <h4>You havn't liked anything!</h4>
          </Box>
        ) : (
          likes.favorites.map((p) => (
            <Grid item xs={2} sm={4} md={4} key={p.id}>
              <PostCard
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
      <h2>Memories you have shared</h2>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {currentUser.posts.length === 0 ? (
          <h3>You haven't shared anything....yet!</h3>
        ) : (
          currentUser.posts.map((p) => (
            <Grid item xs={2} sm={4} md={4} key={p.id}>
              <PostCard
                id={p.id}
                username={p.username}
                key={p.id}
                title={p.title}
                url={p.url}
                handleLike={() => handleLike(p.id)}
                likedIds={likedIds}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}
export default Profile;
