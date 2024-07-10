import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../service/api";
import { AuthContext } from "../context/AuthContextWrapper";

function UserProfilePage() {
  const [posts, setPosts] = useState(null);
  const [profile, setProfile] = useState(null);
  const params = useParams();

  async function fetchPosts() {
    try {
      const response = await service.get(`/api/users/${params.id}`);
      setPosts(response.data.posts);
      setProfile(response.data.user);
    } catch (error) {
      // setPosts(null);
      console.log(error);
    }
  }
  useEffect(() => {
    fetchPosts();
  }, []);

  if (!profile || !posts) {
    return <p>Loading...</p>;
  }
  console.log(posts);
  return (
    <div>
      <p>{profile.username}'s profile</p>
      <p>{posts.length} post(s) published</p>
      <div>
        {posts.map((post) => {
          return (
            <div>
              <p>{post.title}</p>
              <img src={post.image} alt="" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserProfilePage;
