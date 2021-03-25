import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { fetchStorage, storeStorage } from "../lib/myFolder";

type Props = {
  id: number;
};

type RegisterState = boolean;

export const MyFolderButton: NextPage<Props> = (props) => {
  const [registerState, setRegisterState] = useState<RegisterState>(false);

  useEffect(() => {
    const set = fetchStorage();
    setRegisterState(set.has(props.id));
  }, []);

  useEffect(() => {
    const set = fetchStorage();
    if (set.has(props.id) === registerState) return;

    if (registerState) set.add(props.id);
    else set.delete(props.id);
    storeStorage(set);
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
