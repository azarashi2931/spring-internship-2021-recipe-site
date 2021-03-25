import { ParsedUrlQuery } from "querystring";
import React from "react";
import { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import * as RecipeAPI from "../../recipe-api/getRecipes";
import {
  APIResponse,
  QueryParameter,
} from "../../@types/recipe-api/getRecipes";
import { RecipeList } from "../../components/RecipeList";
import { Header } from "../../components/Header";

type State =
  | {
      type: "LOADING";
    }
  | {
      type: "NOT_FOUND";
    }
  | {
      type: "LOADED";
      response: APIResponse;
    };

type Props = { state: State; query: QueryParameter };

const TopPage: NextPage<Props> = (props: Props) => {
  const router = useRouter();
  const state = props.state;
  const query = props.query;

  const body = () => {
    switch (state.type) {
      case "LOADING":
        return <h2>Loading</h2>;
      case "NOT_FOUND":
        return <h2>Not Found</h2>;
      case "LOADED": {
        const previousBody = () => {
          const page = "page" in query ? query.page : 1;
          const newQuery: QueryParameter = { page: page - 1 };
          router.push({ pathname: "/recipes", query: newQuery });
        };
        const previous =
          !("id" in query) && state.response.links.prev
            ? previousBody
            : undefined;

        const nextBody = () => {
          const page = "page" in query ? query.page : 1;
          const newQuery: QueryParameter = { page: page + 1 };
          router.push({ pathname: "/recipes", query: newQuery });
        };
        const next =
          !("id" in query) && state.response.links.next ? nextBody : undefined;

        return (
          <RecipeList
            recipes={state.response.recipes}
            previous={previous}
            next={next}
          />
        );
      }
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

const parseQuery = (parsedUrlQuery: ParsedUrlQuery): QueryParameter => {
  if (parsedUrlQuery.page) {
    const query = Number(parsedUrlQuery.page);
    if (!query || isNaN(query)) {
      console.error("invelid query parameter");
      return {};
    }

    return { page: query };
  }

  if (parsedUrlQuery.id) {
    const query = parsedUrlQuery.id;
    if (Array.isArray(query)) {
      console.error("invelid query parameter");
      return {};
    }

    return { id: query };
  }

  return {};
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  //parse query
  const query = parseQuery(context.query);

  //fetch API
  try {
    const res = await RecipeAPI.getRecipes(query);
    return {
      props: { state: { type: "LOADED", response: res }, query: query },
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

export default TopPage;
