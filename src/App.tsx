/**
 * author: Michael McKenzie
 */

import React from "react";
import { RecoilRoot } from "recoil";
import "./css/App.css";
import BlogList from "./BlogList";
import BlogPosts from "./BlogPosts";

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <div className="App-header">
          <h1>My Blog</h1>
        </div>
        <div className="App-grid">
          <BlogList />
          <BlogPosts />
        </div>
      </div>
    </RecoilRoot>
  );
}

export default App;
