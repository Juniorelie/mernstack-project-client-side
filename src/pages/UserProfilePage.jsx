import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../service/api";
import { AuthContext } from "../context/AuthContextWrapper";
import PictureDiplay from "../components/PictureDiplay";

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
    <div className="container mx-auto flex flex-col items-center justify-center pt-4">
      <p className="text-lg font-semibold">{profile.username}'s profile</p>
      <p>{posts.length} {posts.length <= 1 ? "post" : "posts"} published</p>
      <div className="flex  gap-8 md:gap-12 flex-wrap container mx-auto items-center justify-center  h-full py-10">
        {posts.map((post) => {
          return (
            // <div className="">
            //   <p>{post.title}</p>
            //   <img src={post.image} alt="Image of the post" />
            // </div>
            <div className="flex  gap-8 md:gap-12 flex-wrap container mx-auto items-center justify-center  h-full py-10">
              {posts &&
                posts.map((onePost) => (
                  <PictureDiplay onePost={onePost} key={onePost._id} />
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserProfilePage;
