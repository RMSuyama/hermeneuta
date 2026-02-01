import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Phone, MapPin, Calendar, BookOpen, GraduationCap, Briefcase, MessageSquare } from "lucide-react";
import WhatsAppFAB from "@/components/WhatsAppFAB";

export default function Home() {
    return (
        <div className="flex-1">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden border-b border-gold/30">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-6xl md:text-8xl font-serif mb-4 text-gradient drop-shadow-2xl">Hermeneuta</h1>
                    <p className="text-xl md:text-2xl text-foreground/80 tracking-widest uppercase mb-8">Hub Jurídico Regional do Vale do Ribeira</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button variant="gold" size="lg" asChild>
                            <a href="/oab-registro">OAB Registro</a>
                        </Button>
                        <Button variant="outline" size="lg" className="border-gold/50 text-gold hover:bg-gold/10" asChild>
                            <a href="/academico-direito">Acadêmico Direito</a>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Main Hub Grid */}
            <section className="container mx-auto py-16 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <SubsecaoCard city="Registro" href="/oab-registro" />
                    <SubsecaoCard city="Jacupiranga" href="/oab-jacupiranga" />
                    <SubsecaoCard city="Iguape" href="/oab-iguape" />
                </div>
            </section>

            <WhatsAppFAB />
        </div>
    );
}

function SubsecaoCard({ city, href }) {
    return (
        <Card className="group hover:-translate-y-2 transition-all duration-300">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <MapPin className="text-gold" />
                    Subseção de {city}
                </CardTitle>
                <CardDescription>Informações e serviços locais para advogados.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button variant="link" className="text-gold p-0 group-hover:underline" asChild>
                    <a href={href}>Acessar Portal Local &rarr;</a>
                </Button>
            </CardContent>
        </Card>
    );
}
