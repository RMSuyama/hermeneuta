import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
            <h1 className="text-9xl font-serif text-gold/20 absolute -z-10 animate-pulse">404</h1>
            <div className="space-y-6 relative z-10">
                <h2 className="text-4xl md:text-6xl font-serif text-white uppercase tracking-tighter">Página Não Encontrada</h2>
                <p className="text-foreground/60 max-w-md mx-auto italic font-serif">
                    O link que você acessou pode estar quebrado ou a página foi movida para o novo Hub Jurídico.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <Button variant="gold" size="xl" asChild>
                        <a href="/" className="flex items-center gap-2">
                            <Home size={18} /> Voltar ao Hub Principal
                        </a>
                    </Button>
                </div>
            </div>
        </div>
    );
}
