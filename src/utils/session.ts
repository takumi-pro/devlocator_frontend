import "server-only";

import { Session, getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

/**
 * 現在のセッション情報を取得する
 */
export const getSession = async (): Promise<Session | undefined> => {
  const session = await getServerSession(authOptions);
  if (!session) return undefined;
  return session;
};
