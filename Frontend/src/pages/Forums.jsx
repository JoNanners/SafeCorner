import React, { useState, useEffect } from "react";
import "./Forums.css";
import { Link } from "react-router-dom";

export const Forums = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/posts");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPosts([...posts, data]);
      setNewPost({ title: "", content: "" }); // Reset the form
    } catch (error) {
      console.error("Error posting new post:", error);
    }
  };

  return (
    <div className="forum">
      <h1>Neighborhood Support Forum</h1>
      <div className="post-form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newPost.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="content"
            placeholder="Content"
            value={newPost.content}
            onChange={handleChange}
            required
          />
          <button type="submit">Post</button>
        </form>
      </div>
      <div className="posts">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
      <Link to="/dashboard" className="back-button">
        Back to Dashboard
      </Link>
    </div>
  );
};
