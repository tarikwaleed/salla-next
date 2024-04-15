import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { HomeIcon } from "@heroicons/react/16/solid";

export default function TopBar() {
    return (
        <header className="flex items-end justify-between px-6 py-4 bg-gray-800">
            <div></div>
            <UserButton afterSignOutUrl="/"></UserButton>
        </header>
    );
}
