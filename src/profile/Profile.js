import React, { useState, useContext, useEffect, useCallback } from "react";
import PostCard from "../post/PostCard";
import UserContext from "../auth/UserContext";
import NostalgiaApi from "../api";
import LoadingSpinner from "../common/LoadingSpinner";
function Profile() {
  const { currentUser, likedIds, setLikedIds, likes, setLikes } =
    useContext(UserContext);

  // let getLikes = useCallback(
  //   async function getUserLikes(username) {
  //     try {
  //       setLikes(await NostalgiaApi.userLikes(username));
  //     } catch (errors) {
  //       console.error("login failed", errors);
  //       return { success: false, errors };
  //     }

  //     if (currentUser) {
  //       getUserLikes(currentUser.username);
  //     }
  //   },
  //   [likes]
  // );

  async function unlike(id) {
    try {
      await NostalgiaApi.unlike(currentUser.username, id);
    } catch (e) {
      console.log(e);
    }
  }
  console.log(likedIds);
  async function like(id) {
    try {
      await NostalgiaApi.like(currentUser.username, id);
    } catch (e) {
      console.log(e);
    }
  }

  function handleLike(id) {
    if (likedIds.has(id)) {
      unlike(id);
      setLikedIds(new Set(Array.from(likedIds).filter((l) => l !== id)));
    } else {
      like(id);
      setLikedIds(new Set([...likedIds, id]));
    }
  }
  if (!currentUser || !likes || !likedIds) return <LoadingSpinner />;
  console.log(currentUser, "current");
  return (
    <>
      <h1>Hey, {currentUser.username}!</h1>
      {console.log(likes.favorites)}
      <h2>Your likes and or fond memories</h2>
      {console.log(likes)}
      {likes.length === 0 ? (
        <h3>You havn't liked anything! </h3>
      ) : (
        likes.favorites.map((p) => (
          <PostCard
            id={p.id}
            key={p.id}
            title={p.title}
            username={p.username}
            url={p.url}
            likedIds={likedIds}
            handleLike={() => handleLike(p.id)}
          />
        ))
      )}
      <h2>Memories you have shared</h2>
      {currentUser.posts.length === 0 ? (
        <h3>You haven't shared anything....yet!</h3>
      ) : (
        currentUser.posts.map((p) => (
          <PostCard
            id={p.id}
            username={p.username}
            key={p.id}
            title={p.title}
            url={p.url}
            handleLike={() => handleLike(p.id)}
            likedIds={likedIds}
          />
        ))
      )}
    </>
  );
}
export default Profile;
