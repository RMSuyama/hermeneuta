"use client";

import { usePathname } from 'next/navigation';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppFAB() {
    const pathname = usePathname();

    let ctaText = "Falar com suporte";
    if (pathname.includes('oab-registro')) ctaText = "Falar com suporte de Registro";
    if (pathname.includes('oab-jacupiranga')) ctaText = "Falar com suporte de Jacupiranga";
    if (pathname.includes('oab-iguape')) ctaText = "Falar com suporte de Iguape";
    if (pathname.includes('academico')) ctaText = "Falar com suporte Acadêmico";

    const message = encodeURIComponent(`Olá, estou na página ${ctaText.replace('Falar com ', '')} do Hermeneuta e gostaria de informações.`);
    const whatsappUrl = `https://wa.me/5513999999999?text=${message}`; // Número exemplo

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-600 text-white px-4 py-3 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95 group"
        >
            <MessageCircle size={24} className="fill-current" />
            <span className="max-w-0 overflow-hidden transition-all duration-300 group-hover:max-w-xs whitespace-nowrap font-semibold">
                {ctaText}
            </span>
        </a>
    );
}
