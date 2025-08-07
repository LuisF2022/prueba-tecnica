import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { ChevronDown, ChevronRight, Home, Menu, MessageCircleMore, Users } from "lucide-react"
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";


const MobileMenu = () => {
    const { t, i18n } = useTranslation(['commons']);
    if (!i18n.isInitialized) return null;
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

    const [showUsers, setShowUsers] = useState<string | null>(null);

    const toggleDropdown = (label: string) => {
        setShowUsers(prev => (prev === label ? null : label));
    }

    return (<Sheet>
        <SheetTrigger className="md:hidden"><Menu size={20} /></SheetTrigger>
        <SheetContent side="right">
            <SheetTitle></SheetTitle>
            <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                    <div key={item.label}>
                        {item.subitems.length > 0 ? (
                            <button
                                onClick={() => toggleDropdown(item.label)}
                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md hover:cursor-pointer`}
                            >
                                {item.icon}
                                {(
                                    <>
                                        <span className="flex-1 text-left">{item.label}</span>
                                        {showUsers === item.label ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                    </>
                                )}
                            </button>
                        ) : (
                            <Link
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2 rounded-md`}
                            >
                                {item.icon}
                                {<span>{item.label}</span>}
                            </Link>
                        )}

                        {showUsers === item.label && item.subitems.length > 0 && (
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
        </SheetContent>
    </Sheet>)
}

export default MobileMenu