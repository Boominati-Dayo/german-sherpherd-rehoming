"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut } from "lucide-react";

const navItems = [
    { name: "Manage Puppies", href: "/admin" },
    { name: "Applications", href: "/admin/applications" },
    { name: "Testimonials", href: "/admin/testimonials" },
    { name: "Contact Messages", href: "/admin/contacts" },
    { name: "Nanny Images", href: "/admin/nanny-images" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const [isLoginPage, setIsLoginPage] = useState(false);

    useEffect(() => {
        if (pathname === "/admin/login") {
            setIsLoginPage(true);
        } else {
            setIsLoginPage(false);
        }
    }, [pathname]);

    const handleLogout = () => {
        document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        router.push("/admin/login");
    };

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Mobile sidebar toggle */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-brand-black-900 text-white px-4 py-3 flex items-center justify-between">
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="p-2"
                >
                    <Menu className="w-6 h-6" />
                </button>
                <span className="font-black uppercase tracking-wider text-sm truncate max-w-[120px]">Dashboard</span>
                <button
                    onClick={handleLogout}
                    className="p-2 text-red-400"
                >
                    <LogOut className="w-5 h-5" />
                </button>
            </div>

            {/* Sidebar Overlay */}
            {sidebarOpen && (
                <div 
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 h-full w-64 bg-brand-black-900 text-white z-50 transform transition-transform duration-300 lg:translate-x-0 ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-6 border-b border-white/10">
                        <div className="flex items-center justify-between">
                            <h1 className="text-xl font-black uppercase tracking-wider">Admin</h1>
                            <button 
                                onClick={() => setSidebarOpen(false)}
                                className="lg:hidden p-2"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <p className="text-white/60 text-sm mt-1">German Shepherd Rehoming Center</p>
                    </div>

                    {/* Navigation - Scrollable */}
                    <nav className="flex-1 overflow-y-auto py-4">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`block px-6 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${
                                        isActive
                                            ? "bg-brand-orange-700 text-white"
                                            : "text-white/70 hover:bg-white/5 hover:text-white"
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t border-white/10">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-bold uppercase text-sm transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
                <div className="p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}
