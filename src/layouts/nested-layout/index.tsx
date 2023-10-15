import React from "react";

interface NestedLayoutProps {
  children: React.ReactNode;
}

export default function NestedLayout({ children }: NestedLayoutProps) {
  return (
    <div className="flex h-full flex-1">
      <div className="w-80 p-4 border-r">
        <p className="">Nested layout</p>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
