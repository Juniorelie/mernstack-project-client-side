import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
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
  }, []);

  return (
    <div>
      {posts &&
        posts.map((onePost) => (
          <div key={onePost._id}>
            <Link to={onePost._id}>
              <h2>{onePost.title}</h2>
            </Link>
            <p>On {new Date(onePost.createdAt).toLocaleDateString()}</p>
            <p>At {new Date(onePost.createdAt).toLocaleTimeString()}</p>
            <p>{onePost.description}</p>
            <img src={onePost.image} alt="Image of the post" />
          </div>
        ))}
    </div>
  );
}

export default HomePage;
