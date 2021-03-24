import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import * as GetRecipes from "../@types/recipe-api/getRecipes";
import * as SearchRecipes from "../@types/recipe-api/getSearch";
import { Page } from "./Page";

type Props = {
  response: GetRecipes.APIResponse | SearchRecipes.APISuccessResponse;
  previous?: () => void;
  next?: () => void;
};

export const RecipeList: NextPage<Props> = (props) => {
  return (
    <div>
      <ol className="recipeList">
        {props.response.recipes.map((recipe, i) => (
          <li key={i}>
            <article>
              <Link href={"/recipes/" + recipe.id.toString()}>
                <div className="recipeListItem">
                  <div className="recipeListImage">
                    <Image
                      src={
                        recipe.image_url
                          ? recipe.image_url
                          : "/static/noimage.jpg"
                      }
                      alt="レシピ画像"
                      className="recipeListImage"
                      width={300}
                      height={150}
                    />
                  </div>

                  <div className="recipeListDescription">
                    <h2>{recipe.title}</h2>
                    <p>{recipe.description}</p>
                  </div>
                </div>
              </Link>
            </article>
          </li>
        ))}
      </ol>

      <Page previous={props.previous} next={props.next} />
    </div>
  );
};
