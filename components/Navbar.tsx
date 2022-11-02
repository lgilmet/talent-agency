import Link from "next/link";
import React from "react";

type Props = {};

export default function Navbar({}: Props) {
    return (
        <div className="bg-gray-400">
            <Link href="/">Home</Link> |<Link href="/talents">Talents</Link>
        </div>
    );
}
