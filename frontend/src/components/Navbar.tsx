"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

const navItems = [
  { name: "Book_Ride", link: "/book" },
  { name: "My_Rides", link: "/rides" },
  { name: "About_us", link: "/about" },
  { name: "Contact", link: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  function signIn() {
    router.push("/signIn");
  }

  function signUp() {
    router.push("/signUp");
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -60 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-3 left-1/2 -translate-x-1/2 w-[94%] md:w-[80%] z-50 rounded-full bg-[#080808] text-white shadow-2xl border border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-14">
        {/* 🔥 Logo */}
        <Link href="/">
          <Image
            src="/racing.png"
            alt="logo"
            height={30}
            width={40}
            className="cursor-pointer"
          />
        </Link>

        {/* 🔥 Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item, index) => (
            <Link key={index} href={item.link}>
              <span className="cursor-pointer hover:text-blue-400 transition">
                {item.name}
              </span>
            </Link>
          ))}

          <button
            className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm cursor-pointer"
            onClick={() => signUp()}
          >
            SignUp
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm cursor-pointer"
            onClick={() => signIn()}
          >
            SignIn
          </button>
        </div>

        <div className="md:hidden">
          <button onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#080808] px-6 py-4 rounded-b-2xl"
        >
          <div className="flex flex-col gap-4">
            {navItems.map((item, index) => (
              <Link key={index} href={item.link} onClick={() => setOpen(false)}>
                <span className="block text-sm hover:text-blue-400">
                  {item.name}
                </span>
              </Link>
            ))}

            <button
              className="bg-blue-500 px-3 py-1 rounded text-sm cursor-pointer"
              onClick={() => signUp()}
            >
              SignUp
            </button>
            <button
              className="bg-red-500 px-3 py-1 rounded text-sm cursor-pointer"
              onClick={() => signIn()}
            >
              SignIn
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
