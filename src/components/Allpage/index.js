import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Allpage() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

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

  const showComments = (id) => {
    navigate(`/showComments/${id}`);
  };

  const deletePost = async (postId) => {
    try {
      const userId = localStorage.getItem("ID");
      const result = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/post/delPost`,
        {
          data: { userId, postId },
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      getAllItems();
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
          <img src={item.img} width="200px" height="200px" />
          <p>{item.desc}</p>
          <p>{item.img}</p>
          <p>{item.timestamp}</p>
          <button
            onClick={() => {
              showComments(item._id);
            }}
          >
            Show comments{" "}
          </button>
          {localStorage.getItem("role") === "61a48ba362b112055163b918" ? (
            <button onClick={() => deletePost(item._id)}> delete </button>
          ) : (
            <></>
          )}

          <br />
          <hr />
          <br />
        </>
      ))}
    </div>
  );
}
