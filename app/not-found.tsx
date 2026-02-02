import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-lg">Page not found</p>
      <Link href="/" className="text-blue-500">
        Go back to home
      </Link>
    </div>
  );
};

export default NotFound;
