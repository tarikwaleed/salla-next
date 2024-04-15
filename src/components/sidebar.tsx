import { HomeIcon } from "@heroicons/react/16/solid";
import { TicketIcon } from "lucide-react";
import Link from "next/link";
import { YELLO_COLOR, DARK_COLOR } from "@/styles/colors";

export default function SideBar() {
    return (
        <nav className={`${DARK_COLOR} text-white p-6`}>
            <div className="flex  flex-row items-center">
                <Link href="/">
                    <img src="/logo-ar-nobg.png" className="object-contain h-20 w-auto" alt="" />
                </Link>
            </div>
            <div className="pt-20">

                <Link
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-white text-2xl transition-all hover:bg-gray-800"
                    href="/user-dashboard/coupons"
                >
                    <TicketIcon className="w-5 h-5" />
                    Coupons
                </Link>
            </div>
        </nav>
    );
}
