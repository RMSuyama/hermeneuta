"use client";

import React from 'react';
import { useGlobalData } from '@/components/DataProvider';
import NewsFeed from '@/src/components/NewsFeed';
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Scale, MapPin, Briefcase, Bus } from "lucide-react";
import WhatsAppFAB from "@/components/WhatsAppFAB";

export default function Home() {
    const { news, editors, loading } = useGlobalData();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold font-bold"></div>
            </div>
        );
    }

    return (
        <div className="flex-1 bg-background">
            {/* Hero Section - Keeping the Premium Visual */}
            <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden border-b border-gold/30">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 scale-110"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background"></div>

                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] md:text-xs uppercase tracking-widest mb-6">
                        <Star size={12} fill="currentColor" />
                        O Portal de Conexão Jurídica do Vale
                    </div>
                    <h1 className="text-4xl md:text-7xl font-serif mb-4 text-gradient drop-shadow-2xl">
                        Hermeneuta
                    </h1>
                    <p className="text-xs md:text-xl text-foreground/70 tracking-[0.2em] md:tracking-[0.4em] uppercase mb-10 font-light">
                        Hub Jurídico <span className="text-gold">Regional</span>
                    </p>
                </div>
            </section>

            {/* Content Section - Restoring the Original Feed */}
            <div className="container mx-auto py-12 px-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    <div className="lg:col-span-3">
                        <h2 className="text-2xl font-serif mb-8 text-gold uppercase tracking-widest border-l-4 border-gold pl-4">Últimas Publicações</h2>
                        <NewsFeed news={news} editors={editors} isAuthenticated={false} />
                    </div>
                    <div className="space-y-8">
                        <h2 className="text-xl font-serif mb-8 text-gold uppercase tracking-widest">Acesso Rápido</h2>
                        <div className="grid gap-4">
                            <QuickLink href="/oab-registro" label="OAB Registro" icon={<MapPin size={18} />} />
                            <QuickLink href="/balcao-oportunidades" label="Balcão Oportunidades" icon={<Briefcase size={18} />} />
                            <QuickLink href="/horarios-onibus" label="Horários de Ônibus" icon={<Bus size={18} />} />
                            <QuickLink href="/central-diligencias" label="Central de Diligências" icon={<Scale size={18} />} />
                        </div>
                    </div>
                </div>
            </div>

            <WhatsAppFAB />
        </div>
    );
}

function QuickLink({ href, label, icon }) {
    return (
        <a href={href} className="flex items-center gap-3 p-4 bg-secondary/5 border border-gold/10 rounded-xl hover:bg-gold/10 hover:border-gold/30 transition-all group">
            <span className="text-gold group-hover:scale-110 transition-transform">{icon}</span>
            <span className="text-sm font-bold text-foreground/80 group-hover:text-gold">{label}</span>
            <ArrowRight size={14} className="ml-auto text-gold/50 opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
    );
}
