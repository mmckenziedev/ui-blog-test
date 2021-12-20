/**
 * author: Michael McKenzie
 */

import React, { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { postsByDateSelector } from "./atoms";
import BlogDate from "./BlogDate";
import "./css/BlogList.css";

/**
 * Since the data in the Recoil atom is fetched asynschronously we
 * need to wrap the component that fetches the data in a React Suspense
 * boundary. In theory there should be some kind of placeholder like a
 * spinner, shimmer, or something else, but for now it is fine the way
 * it is.
 */
function BlogList() {
  return (
    <section className="BlogList">
      <header>
        <h2 className="BlogList-header">Past Posts</h2>
      </header>
      <React.Suspense fallback={null}>
        <List />
      </React.Suspense>
      <button id="createButton">Create New Post</button>
    </section>
  );
}

function List() {
  const posts = useRecoilValue(postsByDateSelector);

  const listItems = useMemo(
    () =>
      posts
        .map(({ id, title, timestamp }, i) => {
          return (
            <li key={id}>
              <BlogDate timestamp={timestamp} /> - {title}
            </li>
          );
        })
        .reverse(), // display in descending order
    [posts]
  );

  return listItems.length > 0 ? (
    <ol className="BlogList-list">{listItems}</ol>
  ) : (
    <p>No entries</p>
  );
}

/**
 * These days it is just a good idea to memoize components on export
 * instead of trying to profile every last render path for minimal
 * memoization.
 *
 * As an idea this is hotly contested but at scale you will save
 * yourself a lot of performance issues if you have common practices
 * like this.
 *
 * The React team is working on a compiler to eliminate the need to
 * manually do these kinds of things but it is not ready for public
 * consumption. You can see a demo of it the latest React Conf videos.
 */
export default React.memo(BlogList);
