import { ParsedUrlQuery } from "querystring";
import React from "react";
import { NextPage, GetServerSideProps } from "next";
import { NextRouter, useRouter } from "next/router";
import * as RecipeAPI from "../../recipe-api/getRecipes";
import * as RecipeAPIType from "../../@types/recipe-api/getRecipes";
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
      response: RecipeAPIType.APIResponse;
    };

type QueryParameter = { page?: number; id?: string };
type Props = { state: State; query: QueryParameter };

const articlePerPage = 10;

const TopPage: NextPage<Props> = (props: Props) => {
  const router = useRouter();
  const state = props.state;
  const pageQuery = props.query;

  const body = () => {
    switch (state.type) {
      case "LOADING":
        return <h2>Loading</h2>;
      case "NOT_FOUND":
        return <h2>Not Found</h2>;
      case "LOADED": {
        const previous = (() => {
          if (pageQuery.page && pageQuery.id) {
            const page = pageQuery.page - 1;
            if (page <= 0) return undefined;

            const newQuery = { page: page, id: pageQuery.id };
            return (router: NextRouter) => {
              router.push({ pathname: "/recipes", query: newQuery });
            };
          } else if (!pageQuery.page && pageQuery.id) {
            return undefined;
          } else {
            const page = pageQuery.page ? pageQuery.page : 1;
            const newQuery: QueryParameter = { page: page - 1 };
            if (state.response.links.prev)
              return (router: NextRouter) => {
                router.push({ pathname: "/recipes", query: newQuery });
              };
            else return undefined;
          }
        })();

        const next = (() => {
          if (pageQuery.page && pageQuery.id) {
            const ids = pageQuery.id.split(",");
            const page = pageQuery.page + 1;

            if ((page - 1) * articlePerPage >= ids.length) return undefined;

            const newQuery = { page: page, id: pageQuery.id };
            return (router: NextRouter) => {
              router.push({ pathname: "/recipes", query: newQuery });
            };
          } else if (!pageQuery.page && pageQuery.id) {
            return undefined;
          } else {
            const page = pageQuery.page ? pageQuery.page : 1;
            const newQuery: QueryParameter = { page: page + 1 };
            if (state.response.links.next)
              return (router: NextRouter) => {
                router.push({ pathname: "/recipes", query: newQuery });
              };
            else return undefined;
          }
        })();

        return (
          <RecipeList
            recipes={state.response.recipes}
            previous={previous ? () => previous(router) : undefined}
            next={next ? () => next(router) : undefined}
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
  let res: QueryParameter = {};

  if (parsedUrlQuery.page) {
    const page = Number(parsedUrlQuery.page);
    if (!page || isNaN(page)) {
      console.error("invelid query parameter");
      return {};
    }

    res.page = page;
  }

  if (parsedUrlQuery.id) {
    const id = parsedUrlQuery.id;
    if (Array.isArray(id)) {
      console.error("invelid query parameter");
      return {};
    }

    res.id = id;
  }

  return res;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  //parse query
  const pageQuery: QueryParameter = parseQuery(context.query);
  const apiQuery: RecipeAPIType.QueryParameter = (() => {
    if (pageQuery.id) {
      const page = pageQuery.page ? pageQuery.page : 1;
      const ids = pageQuery.id.split(",");
      const slicedIds = ids.slice(
        (page - 1) * articlePerPage,
        page * articlePerPage
      );
      return { id: slicedIds.join(",") };
    } else if (pageQuery.page && !pageQuery.id) {
      return { page: pageQuery.page };
    } else {
      return {};
    }
  })();

  //fetch API
  try {
    const res = await RecipeAPI.getRecipes(apiQuery);
    return {
      props: { state: { type: "LOADED", response: res }, query: pageQuery },
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

export default TopPage;
