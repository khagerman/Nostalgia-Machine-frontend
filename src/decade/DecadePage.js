import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import NostalgiaApi from "../api";
import PostCard from "../post/PostCard";
import UserContext from "../auth/UserContext";
import LoadingSpinner from "../common/LoadingSpinner";
import { toast } from "react-toastify";
import { Grid, Box, Typography } from "@mui/material";
import "./DecadePage.css";

function DecadePage() {
  const { decadeId } = useParams();

  const [decade, setDecade] = useState([]);
  const { currentUser, likedIds, setLikedIds } = useContext(UserContext);
  /**
   *Decade page

   *On mount, loads posts associated with decade from API (decadeId is  from params)
  *updates when new post added or page changes
   *

   *maps through posts and renders them in PostCard component
   */

  //get data on page load, when decade changes, and when user posts/edits post
  useEffect(() => {
    async function getData() {
      let data = await NostalgiaApi.getDecade(decadeId);
      setDecade(data);
    }
    getData();
  }, [decadeId, currentUser]);

  let posts = decade.posts;

  // unlike post logic
  async function unlike(id) {
    try {
      await NostalgiaApi.unlike(currentUser.username, id);
    } catch (e) {
      console.error(e);
    }
  }
  // like post logic
  async function like(id) {
    try {
      await NostalgiaApi.like(currentUser.username, id);
    } catch (e) {
      console.error(e);
    }
  }
  //logic when user clicks on heart/like button. checks if post already liked by user,
  // if so changes to empty heart and uses unlike function to remove from api data
  function handleLike(id) {
    if (!currentUser) {
      toast.warn("Please login to like or save posts!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    if (likedIds.has(id)) {
      unlike(id);
      setLikedIds(new Set(Array.from(likedIds).filter((l) => l !== id)));
    } else {
      like(id);
      setLikedIds(new Set([...likedIds, id]));
    }
  }
  return (
    <div className="DecadePage">
      <Box sx={{ m: 2 }}>
        <h2> {decade.name}</h2>
      </Box>
      <Box sx={{ m: 3 }}>
        {/* mui grid logic */}
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {posts ? (
            posts.map((p) => (
              <Grid item xs={12} sm={4} md={4} key={p.id}>
                <PostCard
                  id={p.id}
                  username={p.username}
                  key={p.id}
                  title={p.title}
                  url={p.url}
                  handleLike={() => handleLike(p.id)}
                />
              </Grid>
            ))
          ) : (
            <LoadingSpinner />
          )}
        </Grid>
      </Box>
    </div>
  );
}
export default DecadePage;
