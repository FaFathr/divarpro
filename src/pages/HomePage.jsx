import React from "react";
import Sidbar from "../components/templates/Sidbar";
import Main from "../components/templates/Main";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../services/user";
import Loader from "../components/modules/Loader";
import { getCategory } from "../services/admin";

function HomePage() {
  const style = { display: "flex" };
  const { data:posts, isLoading:postLoading } = useQuery(["post-list"], getAllPosts);
  const { data:categories ,isLoading:categoryLoading} = useQuery(["get-categories"], getCategory);
  return (
    <>
      {postLoading || categoryLoading ? (
        <Loader />
      ) : (
        <div style={style}>
          <Sidbar  categories={categories}/>
          <Main posts={posts} />
        </div>
      )}
    </>
  );
}

export default HomePage;
