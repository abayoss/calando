import React from "react";

import TeamSwitcher from "./components/team-switcher";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <TeamSwitcher />
          {/* <MainNav className="mx-6" /> */}
          <div className="ml-auto flex items-center space-x-4">
            {/* <Search /> */}
            {/* <UserNav /> */}
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}
