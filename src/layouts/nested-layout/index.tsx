import React from "react";

interface NestedLayoutProps {
  children: React.ReactNode;
}

export default function NestedLayout({ children }: NestedLayoutProps) {
  return (
    <div className="flex">
      <div className="w-80 p-4">
        <p className="">Nested layout</p>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
