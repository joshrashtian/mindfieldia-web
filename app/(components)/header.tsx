"use client";
import { Gasoek_One } from "next/font/google";
import Link from "next/link";
import React from "react";
import { GiAbstract007 } from "react-icons/gi";
import { useUser } from "@/app/(contexts)/UserContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const fontFamily = Gasoek_One({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

const navigation = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Papers",
    href: "/papers",
  },
  {
    label: "Create",
    href: "/create",
  },
];

const Header = () => {
  const { user } = useUser();
  const router = useRouter();
  return (
    <header className="dark:bg-zinc-900 dark:text-white bg-white text-black w-full flex justify-between items-center px-12 py-4">
      <Link href="/">
        <h1 className={`${fontFamily.className} text-2xl font-bold`}>
          <GiAbstract007 /> mindfieldia.
        </h1>
      </Link>
      <nav className="flex items-center gap-4">
        <ul className="flex items-center gap-4">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
        <Link href="/sign-in">
          {user ? (
            <Avatar>
              <AvatarImage src={user?.avatar_url}></AvatarImage>

              <AvatarFallback className="bg-zinc-900 text-white">
                {user?.full_name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          ) : (
            <Button onClick={() => router.push("/sign-in")} variant="outline">
              <p>Sign in</p>
            </Button>
          )}
        </Link>
      </nav>
    </header>
  );
};

export default Header;
