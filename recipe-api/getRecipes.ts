import { QueryParameter, APIResponse } from "../@types/recipe-api/getRecipes";
import { fetchApi } from "./util";

export const getRecipes = async (
  query: QueryParameter
): Promise<APIResponse> => {
  const res = await fetchApi("GET", "/recipes", { parameter: query });
  if (res.status !== 200) throw new Error();

  const json = await res.json();
  return json as APIResponse;
};
