import Head from "next/head";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";

import RootLayout from "@/layouts/root-layout";

import { useSession } from "next-auth/react";
import NestedLayout from "@/layouts/nested-layout";

const HomePage: NextPageWithLayout = () => {
  const { data: sessionData } = useSession();

  if (!sessionData) {
    return <p>Something went wrong</p>;
  }

  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Home page" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <div className="flex flex-col p-2">
        <p className="text-2xl ">Welcome Back</p>
      </div>
    </>
  );
};

HomePage.getLayout = (page: ReactElement) => {
  return (
    <RootLayout>
      <NestedLayout>{page}</NestedLayout>
    </RootLayout>
  );
};

export default HomePage;
