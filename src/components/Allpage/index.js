import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Allpage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllItems();
  }, []);

  const getAllItems = async () => {
    try {
      const id = localStorage.getItem("ID");
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/post/getAllPosts`
      );

      setPosts(result.data);
      //console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>all posts</h1>
      {posts.map((item) => (
        <>
          <h2>{item.user}</h2>
          <p>{item.desc}</p>
          <p>{item.img}</p>
          <p>{item.timestamp}</p>
        </>
      ))}
    </div>
  );
}
