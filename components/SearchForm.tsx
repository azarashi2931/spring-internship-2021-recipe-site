import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { QueryParameter } from "../@types/recipe-api/getSearch";

type Props = {
  initialQuery: string;
};

export const SearchForm: NextPage<Props> = (props) => {
  const router = useRouter();

  const updateQuery = (queryString: string) => {
    const query: QueryParameter = { keyword: queryString };
    router.push({ pathname: "/recipes/search", query: query });
  };

  return (
    <SearchInput
      initialQuery={props.initialQuery}
      queryChangeHandler={updateQuery}
    />
  );
};

const SearchInput: NextPage<{
  initialQuery: string;
  queryChangeHandler: (query: string) => void;
}> = (props) => {
  const [text, setText] = useState<string>(props.initialQuery);

  useEffect(() => {
    setText(props.initialQuery);
  }, [props.initialQuery]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    props.queryChangeHandler(text);
    event.preventDefault();
  };

  return (
    <div className="searchForm">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="search-query"
          placeholder="検索"
          spellCheck="true"
          onChange={handleChange}
          value={text}
        />
      </form>
    </div>
  );
};
