import React from "react";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import * as GetRecipesId from "../../recipe-api/getRecipesId";
import * as GetRecipes from "../../recipe-api/getRecipes";
import { Recipe } from "../../@types/recipe-api/recipe";
import { APIResponse } from "../../@types/recipe-api/getRecipesId";
import { Header } from "../../components/Header";
import { Steps } from "../../components/Steps";
import { Ingredients } from "../../components/Ingredients";

type State =
  | {
      type: "LOADING";
    }
  | {
      type: "NOT_FOUND";
    }
  | {
      type: "BAD_REQUEST";
    }
  | {
      type: "LOADED";
      recipe: Recipe;
    };

type Props = {
  state: State;
};

const RecipePage: NextPage<Props> = (props) => {
  const state = props.state;
  const router = useRouter();

  if (router.isFallback) {
    return <h2>Loading</h2>;
  }

  const body = () => {
    switch (state.type) {
      case "LOADING":
        return <h2>Loading</h2>;
      case "NOT_FOUND":
        return <h2>Not Found</h2>;
      case "BAD_REQUEST":
        return <h2>Bad Request</h2>;
      case "LOADED":
        return (
          <div>
            <h2>{state.recipe.title}</h2>

            {state.recipe.image_url && (
              <img
                className="recipeImage"
                src={state.recipe.image_url}
                alt="レシピ画像"
              />
            )}

            <div className="recipeMetadata">
              <p>{state.recipe.author.user_name}</p>
              <p>{state.recipe.published_at}</p>
            </div>

            <p>{state.recipe.description}</p>

            <Ingredients ingredients={state.recipe.ingredients} />

            <Steps steps={state.recipe.steps} />
          </div>
        );
      default: {
        const _exhaustiveCheck: never = state;
        return _exhaustiveCheck;
      }
    }
  };

  return (
    <div>
      <Header initialQuery="" />
      {body()}
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  let recipes: Recipe[] = [];
  try {
    let i = 1;
    let next: string | undefined = undefined;
    do {
      const res = await GetRecipes.getRecipes({ page: i });
      recipes = recipes.concat(res.recipes);
      next = res.links.next;
      i++;
    } while (next && i <= 100);
  } catch (error) {
    console.error(error);
  }

  return {
    paths: recipes.map((recipe) => {
      return { params: { id: recipe.id.toString() } };
    }),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = Number(context.params?.id);
  if (id === 0 || isNaN(id)) {
    return { notFound: true };
  }

  let recipe: APIResponse = "NOT_FOUND";
  try {
    recipe = await GetRecipesId.getRecipe(id);
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }

  if (recipe === "NOT_FOUND") {
    return { notFound: true };
  }

  return {
    props: { state: { type: "LOADED", recipe: recipe } },
    revalidate: 600,
  };
};

export default RecipePage;
