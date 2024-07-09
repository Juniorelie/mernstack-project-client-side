import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContextWrapper";
import service from "../service/api";

function HomePage() {
  const [posts, setPosts] = useState(null);
  const { user } = useContext(AuthContext);

  async function fetchPosts() {
    try {
      const response = await service.get("/api/posts");
      setPosts(response.data);
    } catch (error) {
      setPosts(null);
      console.log(error);
    }
  }
  useEffect(() => {
    fetchPosts();
  }, [user]);

  return (
    <div>
      {posts &&
        posts.map((onePost) => (
          <div key={onePost._id}>
            <h2>{onePost.title}</h2>
            <p>{onePost.description}</p>
            <img src={onePost.image} alt="Image of the post" />
          </div>
        ))}
    </div>
  );
}

export default HomePage;
