import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../service/api";
import { AuthContext } from "../context/AuthContextWrapper";

function EditPostPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const params = useParams();
  const nav = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();
    const editform = {
      title,
      description,
    };

    try {
      const response = await service.put(
        `/api/posts/${params.postId}`,
        editform
      );
      console.log(response);
      nav(-1);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchOnePost() {
    try {
      const res = await service.get(`/api/posts/${params.postId}`);
      console.log(res);
      setTitle(res.data.post.title);
      setDescription(res.data.post.description);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchOnePost();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
        />
      </div>

      <button>Edit Post</button>
    </form>
  );
}

export default EditPostPage;
