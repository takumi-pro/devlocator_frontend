"use client";

import { Menu, Transition } from "@headlessui/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { Fragment } from "react";
import { TbLogout } from "react-icons/tb";

// TODO: dropdownはuiに切り出す
/**
 * ドロップダウン
 */
const Dropdown = () => {
  return (
    <Menu as={"div"} className="relative z-sidebar-z inline-block text-left">
      <div>
        <Menu.Button className="rounded-full">
          <Image
            width={38}
            height={38}
            className="relative inline-block cursor-pointer rounded-full border border-sub"
            src="https://lh3.googleusercontent.com/a/ACg8ocLj4MRoxfwGqdoY-NrCs3JUyWyl2QfXfz6s-Bj7W6ZxJw=s96-c"
            alt=""
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="p-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => signOut()}
                  className={`${
                    active
                      ? "bg-custom-c-gray-200 text-gray-900"
                      : "text-gray-900"
                  } group flex h-11 w-full items-center rounded-md p-2 text-sm`}
                >
                  <TbLogout className="mr-2 h-5 w-5 text-custom-icon" />
                  ログアウト
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Dropdown;
