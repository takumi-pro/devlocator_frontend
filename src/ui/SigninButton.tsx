"use client";

import { useState } from "react";

import { SigninDialog } from "@/app/_components/dialog/signinDialog/SigninDialog";

/**
 * Signinボタン
 */
export const SigninButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="">
        {/* TODO: ボタンはuiに切り出す */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="rounded-md bg-custom-main px-4 py-2 text-sm font-medium text-white hover:bg-custom-main focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          ログイン
        </button>
      </div>

      <SigninDialog
        text="DevLocatorは地図上でイベントを探せるサービスです。
                    ログインして気になるイベントをブックマークしましょう！"
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};
