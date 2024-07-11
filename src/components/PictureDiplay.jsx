import React from "react";
import { Link } from "react-router-dom";

function PictureDiplay({ onePost }) {
  return (
    <div className="w-full md:w-1/4 lg:w-1/3 flex flex-col px-2 md:px-0">
      {/* <h2>{onePost.title}</h2>
              <p>{onePost.description}</p> */}
      <Link to={"/" + onePost._id}>
        <img
          className="cover-image w-full h-[20vh] md:h-[30vh] lg:h-[40vh] object-cover hover:shadow-lg transition-shadow duration-200"
          src={onePost.image}
          alt="Image of the post"
        />
      </Link>
    </div>
  );
}

export default PictureDiplay;
