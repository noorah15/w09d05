import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { storage } from "./../../firebase";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";

export default function Userpage() {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState("");
  const [postUpdated, setPostUpdated] = useState("");
  const [like, setLike] = useState("Like");

  const [file, setFile] = useState(null);
  const [url, setURL] = useState("");

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

  const handleUpload = () => {
    const ref = storage.ref(`/images/${file.name}`);
    const uploadTask = ref.put(file);
    uploadTask.on("state_changed", console.log, console.error, () => {
      ref.getDownloadURL().then((url) => {
        // setFile(null);
        setURL(url);
        addPost();
      });
    });
  };

  const addPost = async () => {
    try {
      const userId = localStorage.getItem("ID");
      const avter = localStorage.getItem("avter");
      const username = localStorage.getItem("username");
      //console.log("the s  " + state.tasks.taskAdd);
      console.log(url);

      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/post/addPost`,
        {
          img: url,
          desc: post,
          user: userId,
          userId,
          avter,
          username,
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

  const setLikeFun = async (id) => {
    const userId = localStorage.getItem("ID");

    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/post/setLike`,
        {
          postId: id,
          userId,
        },
        {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(result);
      getAllItems();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Userpage</h1>
      <br />
      <hr />
      <br />
      <input
        type="file"
        name="myImage"
        accept="image/*"
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      />

      <input
        type="post"
        name="post"
        placeholder="post"
        onChange={(e) => setPost(e.target.value)}
      />
      <button onClick={() => handleUpload()}> add post </button>

      <br />
      <hr />
      <br />

      <h1>My Posts</h1>
      {posts.map((item) => (
        <>
          <h2>{item.username}</h2>
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

          {item.likes.find((found) => {
            return found.user == localStorage.getItem("ID") && found.isLike;
          }) ? (
            <button onClick={() => setLikeFun(item._id)}>
              <AiOutlineHeart />{" "}
            </button>
          ) : (
            <button onClick={() => setLikeFun(item._id)}>
              <AiFillHeart />{" "}
            </button>
          )}
          <span>{item.likes.filter((item) => !item.isLike).length}</span>

          <br />
          <hr />
          <br />
        </>
      ))}
    </div>
  );
}
