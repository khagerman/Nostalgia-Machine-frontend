import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NostalgiaApi from "../api";
import Comment from "../comment/Comment";
import NewComment from "../comment/NewComment";
import LoadingSpinner from "../common/LoadingSpinner";

function PostDetail() {
  const { id } = useParams();
  //TODO taniya is this logic okay? to send another api request to update?
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
  const handleNewPost = () => {
    async function getData() {
      let data = await NostalgiaApi.getPost(id);
      setPost(data);
    }
    getData();
  };

  async function handleEdit(postId, newData, id) {
    try {
      await NostalgiaApi.patchComment(postId, newData, id);
      let data = await NostalgiaApi.getPost(postId);
      setPost(data);
      return { success: true };
    } catch (errors) {
      console.error(" failed", errors);
      return { success: false, errors };
    }
  }
  async function handleDelete(postId, id) {
    try {
      await NostalgiaApi.deleteComment(postId, id);
      let data = await NostalgiaApi.getPost(postId);
      setPost(data);
      return { success: true };
    } catch (errors) {
      console.error(" failed", errors);
      return { success: false, errors };
    }
  }
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
              postId={id}
              username={c.username}
              handleDelete={() => handleDelete(id, c.id)}
              handleEdit={handleEdit}
            />
          ))
        ) : (
          <h2>no comments yet!</h2>
        )}

        <NewComment postId={id} onUpdate={() => handleNewPost()} />
      </div>
    </>
  );
}
export default PostDetail;
