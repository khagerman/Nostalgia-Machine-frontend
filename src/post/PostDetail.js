import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NostalgiaApi from "../api";
import Comment from "../comment/Comment";
import NewComment from "../comment/NewComment";
import LoadingSpinner from "../common/LoadingSpinner";
function PostDetail() {
  const { id } = useParams();
  // TODO UPDATE COMMENTS WHEN NEW COMMENT ADDED
  const [post, setPost] = useState([]);

  useEffect(() => {
    async function getData() {
      let data = await NostalgiaApi.getPost(id);
      setPost(data);
    }
    getData();
  }, [id]);
  const comments = post.comments;
  if (!post || !comments) return <LoadingSpinner />;

  //   console.log(comments.length);
  const handleUpdate = () => {
    async function getData() {
      let data = await NostalgiaApi.getPost(id);
      setPost(data);
    }
    getData();
  };
  return (
    <>
      <h1>Post</h1>
      <img src={post.url}></img>
      <h3>{post.title}</h3>
      <h2>username:{post.username}</h2>
      <h3>Comments</h3>
      <div>
        {comments.length !== 0 ? (
          comments.map((c) => (
            <Comment
              text={c.text}
              key={c.id}
              commentId={c.id}
              username={c.username}
            />
          ))
        ) : (
          <h2>no comments yet!</h2>
        )}

        <NewComment postId={id} onUpdate={() => handleUpdate()} />
      </div>
    </>
  );
}
export default PostDetail;
