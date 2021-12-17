import React, { useState, useEffect, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";
import NostalgiaApi from "../api";
import PostCard from "../post/PostCard";
import UserContext from "../auth/UserContext";
import LoadingSpinner from "../common/LoadingSpinner";
function DecadePage() {
  const { decadeId } = useParams();

  const [decade, setDecade] = useState([]);
  const { currentUser, likedIds, setLikedIds, likes, setLikes } =
    useContext(UserContext);

  // const [likedIds, setLikedIds] = useState(new Set([]));
  useEffect(() => {
    async function getData() {
      let data = await NostalgiaApi.getDecade(decadeId);
      setDecade(data);
    }
    getData();
  }, [decadeId, currentUser]);
  console.log(decade);
  let posts = decade.posts;

  // useCallback(() => {
  //   async function getUserLikes(username) {
  //     try {
  //       setLikes(await NostalgiaApi.userLikes(username));
  //     } catch (errors) {
  //       console.error("login failed", errors);
  //       return { success: false, errors };
  //     }
  //   }
  //   if (currentUser) {
  //     getUserLikes(currentUser.username);
  //   }
  // }, [decadeId, likes]);
  async function unlike(id) {
    try {
      await NostalgiaApi.unlike(currentUser.username, id);
      console.log("unliked");
    } catch (e) {
      console.log(e);
    }
  }

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
  return (
    <>
      <h1>{decade.name}</h1>
      {posts ? (
        posts.map((p) => (
          <PostCard
            id={p.id}
            username={p.username}
            key={p.id}
            title={p.title}
            url={p.url}
            handleLike={() => handleLike(p.id)}
          />
        ))
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}
export default DecadePage;
