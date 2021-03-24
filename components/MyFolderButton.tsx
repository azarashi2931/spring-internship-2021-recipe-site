import React, { useState, useEffect } from "react";
import { NextPage } from "next";

type Props = {
  id: number;
};

type RegisterState = boolean;

export const MyFolderButton: NextPage<Props> = (props) => {
  const path = "/MyFolder/" + props.id.toString();
  const [registerState, setRegisterState] = useState<RegisterState>(false);

  useEffect(() => {
    const isMarked: RegisterState = Boolean(localStorage.getItem(path));
    setRegisterState(isMarked);
  }, []);

  useEffect(() => {
    if (registerState) localStorage.setItem(path, true.toString());
    else localStorage.removeItem(path);
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
