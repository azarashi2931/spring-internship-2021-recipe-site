import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { Recipe } from "../@types/recipe-api/recipe";
import { Page } from "./Page";

type Props = {
  recipes: Recipe[];
  previous?: () => void;
  next?: () => void;
  fetch: (index: number) => Promise<Recipe[]>;
};

const generateArticle = (recipe: Recipe) => {
  return (
    <article>
      <Link href={"/recipes/" + recipe.id.toString()}>
        <div className="recipeListItem">
          <div className="recipeListImage">
            <Image
              src={recipe.image_url ? recipe.image_url : "/static/noimage.jpg"}
              alt="レシピ画像"
              className="recipeListImage"
              width={1280}
              height={720}
            />
          </div>

          <div className="recipeListDescription">
            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>
          </div>
        </div>
      </Link>
    </article>
  );
};

export const RecipeList: NextPage<Props> = (props) => {
  return (
    <div>
      <ol className="recipeList">
        {props.recipes.map((recipe, i) => (
          <li key={i}>{generateArticle(recipe)}</li>
        ))}
      </ol>

      <Page previous={props.previous} next={props.next} />
    </div>
  );
};
