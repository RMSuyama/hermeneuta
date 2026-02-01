import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Phone, MapPin, Calendar, ShieldCheck, Scale, Info } from "lucide-react";
import WhatsAppFAB from "@/components/WhatsAppFAB";

export default function OABPage({ params }) {
    const { city } = params;
    const cityName = city.charAt(0).toUpperCase() + city.slice(1);

    return (
        <div className="flex-1">
            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center overflow-hidden border-b border-gold/30">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1577416416141-7c83398941bc?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
                <div className="relative z-10 text-center px-4">
                    <div className="flex justify-center mb-4">
                        <Scale size={64} className="text-gold" />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-serif mb-2 text-gradient">Subseção da OAB</h1>
                    <p className="text-3xl md:text-4xl font-serif text-foreground/90">{cityName}</p>
                </div>
            </section>

            {/* Utilidade Pública Grid */}
            <section className="container mx-auto py-12 px-4">
                <h2 className="text-3xl font-serif mb-8 flex items-center gap-2">
                    <Info className="text-gold" />
                    Utilidade Pública
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <UtilidadeCard
                        title="Sede da Subseção"
                        icon={<MapPin />}
                        content="Rua Jurídica, 123 - Centro"
                        link="#"
                        linkText="Ver no Mapa"
                    />
                    <UtilidadeCard
                        title="Plantão de Prerrogativas"
                        icon={<ShieldCheck />}
                        content="Atendimento 24h para defesa profissional."
                        link="#"
                        linkText="Acionar Plantão"
                        highlight
                    />
                    <UtilidadeCard
                        title="Agenda da ESA"
                        icon={<Calendar />}
                        content="Cursos e eventos da Escola Superior de Advocacia."
                        link="#"
                        linkText="Ver Calendário"
                    />
                </div>
            </section>

            {/* Notícias Locais Feed (Mock) */}
            <section className="container mx-auto py-12 px-4 bg-secondary/20 rounded-3xl mb-12">
                <h2 className="text-3xl font-serif mb-8 text-center uppercase tracking-widest">Notícias de {cityName}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center py-10">
                    <p className="col-span-2 text-foreground/50 italic font-serif text-xl border-y border-gold/20 py-8">
                        Nenhuma notícia local cadastrada no momento.
                    </p>
                </div>
            </section>

            <WhatsAppFAB />
        </div>
    );
}

function UtilidadeCard({ title, icon, content, link, linkText, highlight = false }) {
    return (
        <Card className={highlight ? "border-gold/60 bg-gold/5" : ""}>
            <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                    <span className="text-gold">{icon}</span>
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="mb-4 text-foreground/80">{content}</p>
                <Button variant={highlight ? "gold" : "outline"} className="w-full" asChild>
                    <a href={link}>{linkText}</a>
                </Button>
            </CardContent>
        </Card>
    );
}
