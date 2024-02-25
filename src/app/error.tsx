"use client";

import Image from "next/image";

/**
 * エラー画面
 */
const Error = () => {
  return (
    <div className="flex h-content flex-row items-center justify-center bg-custom-sky-blue">
      <div className="relative flex flex-col items-center justify-center pb-20">
        <Image
          className="w-full"
          width={300}
          height={500}
          src={"/error.png"}
          alt=""
        />
        <h3 className="text-lg font-bold text-slate-400">
          エラーが発生しました
        </h3>
        <button
          onClick={() => {
            window.location.replace("/");
          }}
          className="mt-10 rounded-md bg-custom-main px-4 py-2 text-sm font-medium text-white hover:bg-custom-main focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          トップへ戻る
        </button>
      </div>
    </div>
  );
};

export default Error;
