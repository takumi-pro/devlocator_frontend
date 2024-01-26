import Image from "next/image";

import { SigninButton } from "@/ui/SigninButton";
import { getSession } from "@/utils/session";

import Dropdown from "./Dropdown";

/**
 * ヘッダー
 */
export const Header = async () => {
  const session = await getSession();
  return (
    <header className="flex h-14 w-full justify-center border-b border-sub">
      <div className="flex w-full max-w-6xl justify-between px-6">
        <Image width={120} height={45} src="logo.svg" alt="" />
        <div className="flex items-center">
          {session?.user ? <Dropdown /> : <SigninButton />}
        </div>
      </div>
    </header>
  );
};
