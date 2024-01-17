import { Signin } from "@/ui/Signin";
import { Signout } from "@/ui/Signout";
import { getSession } from "@/utils/session";

/**
 * Home
 */
const Home = async () => {
  const session = await getSession();
  return (
    <main>
      {session && <Signout />}
      {!session && <Signin />}
      <p>{session ? session.user?.name : "名前はまだない"}</p>
    </main>
  );
};

export default Home;
