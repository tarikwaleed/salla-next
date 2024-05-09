import { UserButton } from "@clerk/nextjs";

export default function TopBar() {
    return (
        <header className="flex items-center justify-between px-8 h-20 bg-gray-100  shadow ">
            <div>

            </div>
            <UserButton afterSignOutUrl="/" ></UserButton>
        </header>

    );
}
