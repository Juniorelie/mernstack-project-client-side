import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContextWrapper";
import service from "../service/api";
import PictureDiplay from "../components/PictureDiplay";

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
    <div className="flex  gap-8 md:gap-12 flex-wrap container mx-auto items-center justify-center  h-full py-10">
      {posts &&
        posts.map((onePost) => (
          <PictureDiplay onePost={onePost} key={onePost._id} />
        ))}
    </div>
  );
}

export default HomePage;
