"use client";

import { Share2 } from "lucide-react";
import { Button } from "./ui/button";

export default function ShareButton({ title }) {
    const handleShare = () => {
        if (typeof navigator !== 'undefined' && navigator.share) {
            navigator.share({
                title: title,
                url: window.location.href
            }).catch(() => {
                copyToClipboard();
            });
        } else {
            copyToClipboard();
        }
    };

    const copyToClipboard = () => {
        if (typeof navigator !== 'undefined') {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copiado para a área de transferência!');
        }
    };

    return (
        <Button
            variant="outline"
            size="sm"
            className="border-gold/30 text-gold hover:bg-gold hover:text-black gap-2 transition-all"
            onClick={handleShare}
        >
            <Share2 size={16} /> <span className="hidden md:inline">Compartilhar</span>
        </Button>
    );
}
