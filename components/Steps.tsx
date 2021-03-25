import React from "react";
import { NextPage } from "next";

type Props = { steps: string[] };

export const Steps: NextPage<Props> = (props) => {
  return (
    <div className="recipeSubsection">
      <h2>手順</h2>
      <ol>
        {props.steps.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
    </div>
  );
};
