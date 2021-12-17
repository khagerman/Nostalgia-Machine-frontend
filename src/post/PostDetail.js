import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import NostalgiaApi from "../api";
import Comment from "../comment/Comment";
import NewComment from "../comment/NewComment";
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext";
import PopUpEditPost from "./EditPost";
function PostDetail() {
  const { id } = useParams();
  //TODO taniya is this logic okay? to send another api request to update?
  const [post, setPost] = useState([]);
  const history = useHistory();
  const {
    currentUser,
    likedIds,
    setLikedIds,
    setCurrentUser,
    like,
    unlike,
    handleLike,
  } = useContext(UserContext);
  const [show, setShow] = useState(false);

  const togglePop = () => {
    setShow(!show);
  };
  useEffect(() => {
    async function getData() {
      let data = await NostalgiaApi.getPost(id);
      setPost(data);
    }
    getData();
  }, [id, show]);
  const comments = post.comments;
  if (!post || !comments) return <LoadingSpinner />;

  //   console.log(comments.length);
  async function handleDeletePost(postId, username) {
    try {
      await NostalgiaApi.deletePost(postId);
      let currentUser = await NostalgiaApi.getUser(username);
      setCurrentUser(currentUser);
      history.push(`/`);
    } catch (errors) {
      console.error(" failed", errors);
      return { success: false, errors };
    }
  }
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
      {!show ? (
        <div>
          <img src={post.url}></img>
          <h3>{post.title}</h3>
          <h2>username:{post.username}</h2>
        </div>
      ) : (
        <PopUpEditPost
          id={id}
          toggle={togglePop}
          url={post.url}
          title={post.title}
        />
      )}
      <div>
        {post?.username !== currentUser?.username ? (
          <button onClick={() => handleLike(id, post.username)}>
            {likedIds.has(id) ? (
              <i class="fas fa-heart"></i>
            ) : (
              <i class="far fa-heart"></i>
            )}
          </button>
        ) : (
          <>
            <button onClick={togglePop}>
              Edit
              <span class="fas fa-edit"></span>
            </button>
            <button onClick={() => handleDeletePost(id, currentUser.username)}>
              Delete
              <i class="fas fa-trash-alt"></i>
            </button>
          </>
        )}
      </div>
      <h3>Comments</h3>
      <NewComment postId={id} onUpdate={() => handleNewPost()} />
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
      </div>
    </>
  );
}
export default PostDetail;
