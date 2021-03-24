import React from "react";
import { NextPage } from "next";

type Props = {
  previous?: () => void;
  next?: () => void;
};

export const Page: NextPage<Props> = (props) => {
  const isPreviousExists = props.previous != null;
  const isNextExists = props.next != null;
  return (
    <div className="footer">
      <button onClick={props.previous} disabled={!isPreviousExists}>
        前へ
      </button>
      <button onClick={props.next} disabled={!isNextExists}>
        次へ
      </button>
    </div>
  );
};
