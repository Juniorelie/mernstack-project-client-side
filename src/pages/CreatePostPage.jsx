import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../service/api";

function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const nav = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData();
    fd.append("title", title);
    fd.append("description", description);
    fd.append("image", image);

    try {
      const response = await service.post("/api/posts", fd);
      console.log(response);
      if (response.status === 201) {
        nav("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

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
      <div>
        <label htmlFor="image">Pet picture:</label>
        <input
          type="file"
          id="image"
          onChange={(e) => setImage(e.currentTarget.files[0])}
        />
      </div>

      <button>Create Post</button>
    </form>
  );
}

export default CreatePostPage;
