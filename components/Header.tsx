import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import NextHeader from "next/head";
import Link from "next/link";
import { SearchForm } from "./SearchForm";
import { SiteTitle, SiteDescription } from "../lib/site-data";

type Props = { initialQuery: string };

export const Header: NextPage<Props> = (props) => {
  const router = useRouter();

  return (
    <div className="header">
      <NextHeader>
        <title>{SiteTitle}</title>
        <meta name="description" content={SiteDescription} />
        <meta property="og:url" content={router.asPath} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={SiteTitle} />
        <meta property="og:description" content={SiteDescription} />
      </NextHeader>
      <Link href="/">
        <h1 className="title">{SiteTitle}</h1>
      </Link>
      <SearchForm initialQuery={props.initialQuery} />
      <Link href="/recipes/myfolder">
        <button>マイフォルダ</button>
      </Link>
    </div>
  );
};
