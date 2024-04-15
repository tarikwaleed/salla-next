"use client";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { UserButton, UserProfile } from "@clerk/nextjs";

export default function Home() {
    const tasks = useQuery(api.tasks.get);
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <UserButton afterSignOutUrl="/"></UserButton>
            {tasks?.map(({ _id, text }) => <div key={_id}>{text}</div>)}
        </main>
    );
}

