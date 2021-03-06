import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { Button, ButtonGroup, Stack } from "@chakra-ui/react";

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
      <h1>all posts</h1>
      {posts.map((item) => (
        <>
          <h2>{item.username}</h2>
          <img src={item.img} width="200px" height="200px" />
          <p>{item.desc}</p>
          <p>{item.timestamp}</p>

          <Stack direction="row" spacing={4} align="center">
            <Button
              colorScheme="teal"
              variant="outline"
              onClick={() => {
                showComments(item._id);
              }}
            >
              Show comments
            </Button>

            {localStorage.getItem("role") === "61a48ba362b112055163b918" ? (
              <Button
                colorScheme="teal"
                variant="outline"
                onClick={() => {
                  deletePost(item._id);
                }}
              >
                delete
              </Button>
            ) : (
              <></>
            )}
          </Stack>

          {localStorage.getItem("ID") ? (
            item.likes.find((found) => {
              return found.user == localStorage.getItem("ID") && found.isLike;
            }) ? (
              <button onClick={() => setLikeFun(item._id)}>
                <AiOutlineHeart />{" "}
              </button>
            ) : (
              <button onClick={() => setLikeFun(item._id)}>
                <AiFillHeart />{" "}
              </button>
            )
          ) : (
            <></>
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
