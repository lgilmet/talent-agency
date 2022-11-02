import Link from "next/link";
import React from "react";

type Props = {};

export default function Navbar({}: Props) {
    return (
        <div className="bg-[#f1f5f9ab] flex gap-5 backdrop-blur fixed z-10 h-12 w-full justify-center items-center">
            <Link href="/">The agency</Link>
            <p>|</p>
            <Link href="/talents">The talents</Link>
        </div>
    );
}
