"use client";
import React from "react";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";

const TipTapEditor = dynamic(
  () => import("../(components)/tiptap-components/TipTapEditor"),
  { ssr: false },
);

const CreatePage = () => {
  return (
    <div className="p-16">
      <h1 className="text-5xl font-black">Create.</h1>
      {/* Title */}
      <h1 className="text-2xl font-bold">Title</h1>
      <Input placeholder="Enter your title" />

      <TipTapEditor />
    </div>
  );
};

export default CreatePage;
