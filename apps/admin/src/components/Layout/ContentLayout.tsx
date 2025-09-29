import React from "react";

const ContentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="min-h-screen bg-background w-full">{children}</div>
    </>
  );
};

export default ContentLayout;
