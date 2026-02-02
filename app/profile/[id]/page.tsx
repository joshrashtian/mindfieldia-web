"use server";
import React from "react";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { GiSchoolBag } from "react-icons/gi";
import { GraduationCap, Mail, School } from "lucide-react";

const Page = async ({ params }: { params: { id: string } }) => {
  const supabase = createClient(cookies());
  const { id } = await params;
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (!profile) {
    return notFound();
  }
  return (
    <div className="container mx-auto max-w-xl py-12">
      <h1 className="text-4xl font-black">{profile.full_name}</h1>
      <p className="text-sm text-muted-foreground">@{profile.username}</p>
      <p className="text-sm flex items-center gap-2 text-muted-foreground">
        <School className="w-4 h-4" /> {profile.college}
      </p>
      <p className="text-sm flex items-center gap-2 text-muted-foreground">
        {" "}
        <GraduationCap className="w-4 h-4" /> {profile.major}
      </p>
    </div>
  );
};

export default Page;
