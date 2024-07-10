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
          <div key={onePost._id} className="py-4">
              {/* <h2>{onePost.title}</h2>
              <p>{onePost.description}</p> */}
              <Link to={onePost._id}>
                <img src={onePost.image} alt="Image of the post" />
              </Link>
          </div>
        ))}
    </div>
  );
}

export default HomePage;
