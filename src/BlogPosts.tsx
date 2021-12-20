/**
 * author: Michael McKenzie
 */

import React from "react";
import { useRecoilValue } from "recoil";
import { postsByDateSelector, useDeleteBlogPostCallback } from "./atoms";
import BlogDate from "./BlogDate";
import { BlogPost } from "./types";
import "./css/BlogPosts.css";
import { deleteBlogPostByID } from "./data";

function BlogPosts() {
  return (
    <section className="BlogPosts">
      <header>
        <h2 className="">Posts</h2>
      </header>
      <React.Suspense fallback={null}>
        <Posts />
      </React.Suspense>
    </section>
  );
}

function Posts() {
  const posts = useRecoilValue(postsByDateSelector);

  return (
    <>
      {posts.length > 0 ? (
        posts.map((post) => <Post key={post.id} {...post} />)
      ) : (
        <p>No posts</p>
      )}
    </>
  );
}

type PostProps = BlogPost;

function Post({ id, title, text, timestamp }: PostProps) {
  const deletePost = useDeleteBlogPostCallback(id);

  return (
    <article>
      <header>
        <h3 className="BlogPost-header">
          <span>{title}</span>
          <span>
            <BlogDate timestamp={timestamp} />
          </span>
        </h3>
      </header>
      <p>{text}</p>
      <footer className="BlogPost-footer">
        <button title={`Edit post ${id}`}>Edit</button>
        {" | "}
        <button onClick={deletePost} title={`Delete post ${id}`}>
          Delete
        </button>
      </footer>
    </article>
  );
}

export default React.memo(BlogPosts);
