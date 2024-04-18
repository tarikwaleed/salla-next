import { UserButton } from "@clerk/nextjs";

export default function TopBar() {
    return (
        <header className="flex items-center justify-between px-4 py-3 bg-white  shadow-md">
            <div>

            </div>
            <UserButton afterSignOutUrl="/" ></UserButton>
        </header>

    );
}
