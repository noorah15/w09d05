import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ShowComments() {
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [post, setPost] = useState([]);
  const [users, setUsers] = useState([]);

  const [newComment, setNewComment] = useState("");
  const [updatedComment, setUpdatedComment] = useState("");

  const { id } = useParams();

  useEffect(() => {
    getAllItems();
  }, []);

  const getAllItems = async () => {
    try {
      //const id = localStorage.getItem("ID");
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/post/getPostForUser/${id}`
      );

      setPost(result.data.result);
      setUsers(result.data.user);
      setComments(result.data.comment);
      setLikes(result.data.like);
      //setUsers(result.data.user);

      console.log(result.data.user);
      // console.log(result.data.like);
      // console.log(result.data.result);
      console.log(post);
    } catch (err) {
      console.log(err);
    }
  };

  const addComment = async () => {
    try {
      const userId = localStorage.getItem("ID");
      const avter = localStorage.getItem("avter");
      const username = localStorage.getItem("username");
      //console.log("the s  " + state.tasks.taskAdd);
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/comments/addCommnet`,
        {
          desc: newComment,
          user: userId,
          userId,
          postId: post[0]._id,
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

  const updateComment = async (commnetId) => {
    try {
      const userId = localStorage.getItem("ID");
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/comments/updateComment`,
        {
          commnetId,
          userId,
          desc: updatedComment,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(result.data);
      getAllItems();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteComment = async (commnetId) => {
    try {
      const userId = localStorage.getItem("ID");
      const result = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/comments/delComment`,
        {
          data: { userId, commnetId },
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      getAllItems();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Post:</h1>
      {post.map((item) => (
        <>
          <h2>{item.user}</h2>
          <img src={item.img} />
          <p>{item.desc}</p>
          <p>{item.timestamp}</p>
          <span>{item.likes.filter((item) => !item.isLike).length}</span>
        </>
      ))}
      <br />
      <hr />
      <br />
      {!localStorage.getItem("ID") ? (
        <></>
      ) : (
        <>
          <input
            type="comment"
            name="comment"
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={() => addComment()}> add comment </button>
        </>
      )}

      <h1>all comments</h1>
      {comments.map((item) => (
        <>
          <h2>{item.username}</h2>
          <p>{item.desc}</p>
          <p>{item.timestamp}</p>
          <br />

          {localStorage.getItem("ID") === item.userId ? (
            <>
              <input
                type="text"
                name="task"
                onChange={(e) => {
                  setUpdatedComment(e.target.value);
                }}
              />
              <button onClick={() => updateComment(item._id)}> update </button>
              <button onClick={() => deleteComment(item._id)}> delete </button>
            </>
          ) : localStorage.getItem("ID") === post[0].user ||
            localStorage.getItem("role") === "61a48ba362b112055163b918" ? (
            <>
              <button onClick={() => deleteComment(item._id)}> delete </button>
            </>
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
