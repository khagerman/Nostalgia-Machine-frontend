import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NostalgiaApi from "../api";
import PostCard from "../post/PostCard";
function DecadePage() {
  const { decadeId } = useParams();

  const [decade, setDecade] = useState([]);

  useEffect(() => {
    async function getData() {
      let data = await NostalgiaApi.getDecade(decadeId);
      setDecade(data);
    }
    getData();
  }, [decadeId]);
  console.log(decade);
  let posts = decade.posts;

  return (
    <>
      <h1>{decade.name}</h1>
      {posts ? (
        posts.map((p) => (
          <PostCard id={p.id} key={p.id} title={p.title} url={p.url} />
        ))
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
}
export default DecadePage;
