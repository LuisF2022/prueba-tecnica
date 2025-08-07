'use client'

import { Home, Users, Menu, MessageCircleMore, ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
    const { t, i18n } = useTranslation(['commons'])

    if (!i18n.isInitialized) return null;

    const [collapsed, setCollapsed] = useState(false);
    const [showUsers, setShowUsers] = useState<string | null>(null);

    const toggleDropdown = (label: string) => {
        setShowUsers(prev => (prev === label ? null : label));
    }

    const navItems = [
        { label: t('menus.home'), icon: <Home className="shrink-0" size={15} />, href: "/", subitems: [] },
        {
            label: t('menus.users'),
            icon: <Users className="shrink-0" size={15} />,
            href: "#",
            subitems: [
                { label: t('menus.usersPaginate'), href: "/users/paginate" },
                { label: t('menus.usersScroll'), href: "/users/scroll" }
            ]
        },
        { label: t('menus.chat'), icon: <MessageCircleMore className="shrink-0" size={15} />, href: "/chat", subitems: [] },
    ];

    useEffect(() => {
        const handleResize = () => {
            setCollapsed(window.innerWidth < 640);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <aside className={`h-screen bg-muted border-r p-4 md:flex flex-col transition-all duration-300 hidden ${collapsed ? "w-16" : "w-56"}`}>
            <div className="flex items-center justify-between mb-6">
                {!collapsed && <span className="text-lg font-bold">Basic App</span>}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <Menu size={20} />
                </Button>
            </div>

            <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                    <div key={item.label}>
                        {item.subitems.length > 0 ? (
                            <button
                                onClick={() => toggleDropdown(item.label)}
                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md hover:cursor-pointer ${collapsed ? "justify-center" : ""}`}
                            >
                                {item.icon}
                                {!collapsed && (
                                    <>
                                        <span className="flex-1 text-left">{item.label}</span>
                                        {showUsers === item.label ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                    </>
                                )}
                            </button>
                        ) : (
                            <Link
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2 rounded-md ${collapsed ? "justify-center" : ""}`}
                            >
                                {item.icon}
                                {!collapsed && <span>{item.label}</span>}
                            </Link>
                        )}

                        {!collapsed && showUsers === item.label && item.subitems.length > 0 && (
                            <div className="ml-6 mt-1 flex flex-col gap-1">
                                {item.subitems.map((sub) => (
                                    <Link
                                        key={sub.href}
                                        href={sub.href}
                                        className="text-sm px-3 py-1 rounded-md"
                                    >
                                        {sub.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
