import React, { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import service from "../service/api";
import { AuthContext } from "../context/AuthContextWrapper";

function OnePostPage() {
  const [onePost, setOnePost] = useState(null);
  const params = useParams();
  const { user } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  async function fetchOnePost() {
    try {
      const post = await service.get(`/api/posts/${params.postId}`);
      console.log(post);
      setOnePost(post.data.post);
    } catch (error) {
      console.log(error);
    }
  }

  const isOwner = user?._id === onePost?.userId?._id;

  useEffect(() => {
    fetchOnePost();
  }, []);

  async function handledelete(event) {
    event.preventDefault();
    try {
      const response = await service.delete(`/api/posts/${params.postId}`);
      console.log(response);
      if (response.status === 204) {
        setTimeout(() => {
          navigate("/");
        }, 200);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  }

  if (!onePost) {
    return <p>Loading...</p>;
  }
  console.log(onePost);

  return (
    <div>
      {isOwner && <Link to={`/${onePost._id}/edit`}>Edit post</Link>}
      <h2>{onePost.title}</h2>
      <p>
        Created by :{" "}
        <Link to={"/profile/" + onePost.userId._id}>
          {onePost.userId.username}
        </Link>
      </p>
      <p>{new Date(onePost.createdAt).toLocaleDateString()}, At {new Date(onePost.createdAt).toLocaleTimeString()}</p>
      <p>{onePost.description}</p>
      <img src={onePost.image} alt="Image of the post" />
      {isOwner && <button onClick={handledelete}>Delete</button>}
    </div>
  );
}

export default OnePostPage;
