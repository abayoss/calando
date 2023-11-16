import React from "react";

import Head from "next/head";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <Head>
        <title>Calando - Maximize your performance</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col">
        {/* <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            <div className="ml-auto flex items-center space-x-4"></div>
          </div>
        </div> */}
        <div className="flex flex-1 flex-col">{children}</div>
      </div>
    </>
  );
}
