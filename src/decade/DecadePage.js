import React, { useState, useEffect, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";
import NostalgiaApi from "../api";
import PostCard from "../post/PostCard";
import UserContext from "../auth/UserContext";
import LoadingSpinner from "../common/LoadingSpinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function DecadePage() {
  const { decadeId } = useParams();

  const [decade, setDecade] = useState([]);
  const {
    currentUser,
    likedIds,
    setLikedIds,
    likes,
    setLikes,
    // handleLike,
    // like,
    // unlike,
  } = useContext(UserContext);

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
  const notify = () =>
    toast.warn("Please login to like or save posts!", {
      position: toast.POSITION.TOP_CENTER,
    });
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
    if (!currentUser) {
      notify();
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
    <>
      <h1>{decade.name}</h1>
      <ToastContainer autoClose={5000} hideProgressBar={true} />
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
