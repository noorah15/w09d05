import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Userpage() {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState("");
  const [postImage, setPostImage] = useState("");
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
          img: postImage,
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
      <br />
      <hr />
      <br />
      <input
        type="text"
        name="myImage"
        placeholder="image"
        onChange={(e) => {
          setPostImage(e.target.value);
          // if (e.target.files && e.target.files[0]) {
          //   //console.log("e.target.result");
          //   const FR = new FileReader();
          //   FR.onload = function (e) {
          //     console.log(e.target.result);
          //     setPostImage(e.target.result);
          //   };
          //   FR.readAsDataURL(e.target.files[0]);
          // }
        }}
      />

      <input
        type="post"
        name="post"
        placeholder="post"
        onChange={(e) => setPost(e.target.value)}
      />
      <button onClick={() => addPost()}> add post </button>

      <br />
      <hr />
      <br />

      <h1>My Posts</h1>
      {posts.map((item) => (
        <>
          <h2>{item.user}</h2>
          <img src={item.img} width="200px" height="200px" />
          <p>{item.desc}</p>
          <p>{item.timestamp}</p>
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
          <br />
          <hr />
          <br />
        </>
      ))}
    </div>
  );
}
