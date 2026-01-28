import { Gasoek_One } from "next/font/google";
import Link from "next/link";
import React from "react";
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
  return (
    <header className="dark:bg-zinc-900 dark:text-white bg-white text-black w-full flex justify-between items-center px-12 py-4">
      <h1 className={`${fontFamily.className} text-2xl font-bold`}>
        {"<project name>"}
      </h1>
      <nav>
        <ul className="flex items-center gap-4">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
