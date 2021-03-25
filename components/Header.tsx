import React from "react";
import { NextPage } from "next";
import NextHeader from "next/head";
import Link from "next/link";
import { SearchForm } from "./SearchForm";
import { SiteTitle } from "../lib/site-data";

type Props = { initialQuery: string };

export const Header: NextPage<Props> = (props) => {
  return (
    <div className="header">
      <NextHeader>
        <title>{SiteTitle}</title>
      </NextHeader>
      <Link href="/">
        <h1 className="title">{SiteTitle}</h1>
      </Link>
      <SearchForm initialQuery={props.initialQuery} />
    </div>
  );
};
