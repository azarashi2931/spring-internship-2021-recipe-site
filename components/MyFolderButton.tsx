import React, { useState, useEffect } from "react";
import { NextPage } from "next";

type Props = {
  id: number;
};

type RegisterState = boolean;

export const MyFolderButton: NextPage<Props> = (props) => {
  const path = "/MyFolder";
  const [registerState, setRegisterState] = useState<RegisterState>(false);

  const fetchStorage = (): Set<number> => {
    const json = localStorage.getItem(path);
    const set = json ? new Set<number>(JSON.parse(json)) : new Set<number>();
    return set;
  };

  useEffect(() => {
    const set = fetchStorage();
    setRegisterState(set.has(props.id));
  }, []);

  useEffect(() => {
    const set = fetchStorage();
    console.log("pass1");
    if (set.has(props.id) === registerState)
      return;

    console.log("pass2");
    if (registerState)
      set.add(props.id);
    else
      set.delete(props.id);
    const newJson = JSON.stringify(Array.from(set));
    localStorage.setItem(path, newJson);
  }, [registerState]);

  return (
    <div className="footer">
      <button
        onClick={() => {
          if (!registerState || confirm("このレシピの登録を解除しますか？"))
            setRegisterState(!registerState);
        }}
      >
        {registerState ? "マイフォルダへの登録を解除" : "マイフォルダに登録"}
      </button>
    </div>
  );
};
