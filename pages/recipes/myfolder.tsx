import React, { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Recipe } from "../../@types/recipe-api/recipe";
import { fetchStorage } from "../..//lib/myFolder";
import { Header } from "../../components/Header";

const MyFolderPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const res = fetchStorage();
    const query =
      "id=" +
      Array.from(res)
        .map((id) => id.toString())
        .join(",");
    router.push("/recipes?" + query);
  });

  return (
    <div>
      <Header initialQuery="" />
      <h2>Loading</h2>
    </div>
  );
};

export default MyFolderPage;
