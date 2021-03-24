import React from "react";
import { AppProps } from "next/app";
import "../styles/recipe.css";
import "../styles/recipe_list.css";
import "../styles/common.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default MyApp;
