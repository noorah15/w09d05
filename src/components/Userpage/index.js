import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Userpage() {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState("");
  const [postUpdated, setPostUpdated] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getAllItems();
  }, []);

  const getAllItems = async () => {
    try {
      const id = localStorage.getItem("ID");
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/post/getAllPostsForUser/${id}`
      );

      setPosts(result.data);
      //console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addPost = async () => {
    try {
      const userId = localStorage.getItem("ID");
      const id = localStorage.getItem("ID");
      //console.log("the s  " + state.tasks.taskAdd);
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/post/addPost`,
        {
          img: "https://image.shutterstock.com/image-photo/surreal-image-african-elephant-wearing-260nw-1365289022.jpg",
          desc: post,
          user: userId,
          userId,
        },
        {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      console.log(result.data);

      getAllItems();
    } catch (err) {
      console.log(err);
    }
  };

  const updatePost = async (postId) => {
    try {
      const userId = localStorage.getItem("ID");
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/post/updatePost`,
        {
          postId,
          userId,
          img: "https://image.shutterstock.com/image-photo/surreal-image-african-elephant-wearing-260nw-1365289022.jpg",
          desc: postUpdated,
        },
        {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(result.data);
      getAllItems();
    } catch (err) {
      console.log(err);
    }
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

  const showComments = (id) => {
    navigate(`/showComments/${id}`);
  };

  return (
    <div>
      <h1>Userpage</h1>
      <input
        type="post"
        name="post"
        onChange={(e) => setPost(e.target.value)}
      />
      <button onClick={() => addPost()}> add post </button>

      <br />
      <hr />
      <br />

      <h1>My Posts</h1>
      {posts.map((item) => (
        <>
          <p>{item.desc}</p>
          <button
            onClick={() => {
              showComments(item._id);
            }}
          >
            Show comments{" "}
          </button>
          <br />
          <input
            type="text"
            name="task"
            onChange={(e) => {
              setPostUpdated(e.target.value);
            }}
          />
          <button onClick={() => updatePost(item._id)}> update </button>
          <button onClick={() => deletePost(item._id)}> delete </button>
        </>
      ))}
    </div>
  );
}
