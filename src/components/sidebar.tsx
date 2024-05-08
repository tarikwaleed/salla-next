import { ShoppingBag, StoreIcon } from "lucide-react";
import Link from "next/link";

export default function SideBar() {
    return (
        <div className="flex flex-col  bg-white dark:bg-gray-800">
            <Link href='/'>
                <div className="flex items-center justify-center h-14 shadow-md">
                    <span className="text-2xl font-semibold text-gray-800 dark:text-white">Logo</span>
                </div>
            </Link>
            <nav className="flex-grow mt-5 px-4 space-y-2 overflow-auto shadow-md">
                <Link
                    className="flex items-center px-2 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
                    href="/dashboard/products"
                >
                    <StoreIcon className="w-6 h-6" />
                    <span className="ml-2 text-sm">المنتجات</span>
                </Link>
                <Link
                    className="flex items-center px-2 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
                    href="#"
                >
                    <ShoppingBag className="w-6 h-6" />
                    <span className="ml-2 text-sm">الطلبات</span>
                </Link>
            </nav>
        </div>
    );
}
