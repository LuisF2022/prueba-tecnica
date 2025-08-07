'use client';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTranslation } from "react-i18next";
import { Globe, LogOut, Settings, User } from "lucide-react";
import MobileMenu from "./MobileMenu";

export default function Header() {
    const { t, i18n } = useTranslation(['commons']);
    if (!i18n.isInitialized) return null;

    const changeLanguage = (lng: 'en' | 'es') => {
        i18n.changeLanguage(lng);
    };

    return (
        <header className="w-full bg-muted border-b px-6 py-4 flex justify-between items-center text-foreground">
            <div className="flex items-center gap-4 ml-auto">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex items-center gap-2">
                            <Globe className="w-4 h-4" />
                            {i18n.language === 'es' ? 'Español' : 'English'}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => changeLanguage('en')}>
                            English
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => changeLanguage('es')}>
                            Español
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="cursor-pointer border-2">
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{t('user.myAccount', { ns: 'commons' })}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            {t('user.profile', { ns: 'commons' })}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            {t('user.settings', { ns: 'commons' })}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <LogOut className="mr-2 h-4 w-4" />
                            {t('user.logout', { ns: 'commons' })}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <MobileMenu />
            </div>
        </header>
    );
}
