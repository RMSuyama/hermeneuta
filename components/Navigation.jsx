"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Newspaper, Phone, Info, GraduationCap, Link as LinkIcon, Gavel, BookOpen, Calendar, ShieldCheck } from 'lucide-react';

const Navigation = () => {
    const pathname = usePathname();

    const links = [
        { id: 'home', path: '/', label: 'Portal', icon: <Gavel size={18} /> },
        { id: 'news', path: '/news', label: 'Notícias', icon: <Newspaper size={18} /> },
        { id: 'concursos', path: '/concursos', label: 'Concursos', icon: <GraduationCap size={18} /> },
        { id: 'eventos', path: '/eventos', label: 'Eventos', icon: <Calendar size={18} /> },
        { id: 'links', path: '/links', label: 'Links Úteis', icon: <LinkIcon size={18} /> },
        { id: 'leituras', path: '/leituras', label: 'Leituras', icon: <BookOpen size={18} /> },
        { id: 'contacts', path: '/contacts', label: 'Contatos', icon: <Phone size={18} /> },
        { id: 'admin', path: '/admin', label: 'Admin', icon: <ShieldCheck size={18} /> },
    ];

    return (
        <nav className="sticky top-0 z-[100] bg-background/80 backdrop-blur-md border-b border-gold/20 py-4">
            <div className="container mx-auto px-4">
                <div className="flex justify-center gap-2 md:gap-6 flex-wrap">
                    {links.map((link) => {
                        const isActive = pathname === link.path;
                        return (
                            <Link
                                key={link.id}
                                href={link.path}
                                className={`flex items-center gap-2 px-3 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300 ${isActive
                                        ? 'bg-gold text-black shadow-[0_0_20px_rgba(197,160,34,0.4)]'
                                        : 'text-foreground/60 hover:text-gold hover:bg-gold/5'
                                    }`}
                            >
                                {link.icon}
                                <span className={isActive ? 'inline' : 'hidden md:inline'}>{link.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
