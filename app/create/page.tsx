"use client";
import React from "react";
import dynamic from "next/dynamic";

const TipTapEditor = dynamic(
  () => import("../(components)/tiptap-components/TipTapEditor"),
  { ssr: false },
);

const CreatePage = () => {
  return (
    <div>
      <TipTapEditor />
    </div>
  );
};

export default CreatePage;
