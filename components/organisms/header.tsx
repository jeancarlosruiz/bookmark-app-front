import { stackServerApp } from "@/stack/server";
import Link from "next/link";

async function Header() {
  const app = stackServerApp.urls;
  const user = await stackServerApp.getUser();

  console.log({ user });

  return (
    <header>
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <div>Logeado</div>
            <Link href={app.signOut}>Sign out</Link>
          </>
        ) : (
          <>
            <Link
              href={app.signIn}
              className="inline-flex h-8 items-center justify-center rounded-md px-4 text-[13px] font-medium text-gray-700 transition-all hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Log In
            </Link>
            <Link
              href={app.signUp}
              className="inline-flex h-8 items-center justify-center font-medium  text-center rounded-full outline-none   dark:text-black bg-primary-1 hover:bg-[#00e5bf] whitespace-nowrap px-6 text-[13px] transition-colors duration-200"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
      This is the header
    </header>
  );
}

export default Header;
