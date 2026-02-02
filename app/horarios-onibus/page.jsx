import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bus, Clock, MapPin, ArrowRight, Info, AlertTriangle } from "lucide-react";
import WhatsAppFAB from "@/components/WhatsAppFAB";

export default function HorariosOnibus() {
    const routes = [
        { from: "Registro", to: "São Paulo", times: ["05:30", "08:15", "11:00", "14:30", "18:00"], company: "Valle Sul" },
        { from: "Registro", to: "Curitiba", times: ["06:00", "09:30", "13:00", "16:45", "20:30"], company: "Princesa dos Campos" },
        { from: "Registro", to: "Santos", times: ["07:15", "10:45", "15:20", "19:00"], company: "Valle Sul" },
        { from: "Pariquera-Açu", to: "Registro", times: ["06:30", "07:30", "08:30 (Conv)", "12:00", "17:30"], company: "Intermunicipal" },
        { from: "Iguape", to: "Registro", times: ["06:15", "08:45", "11:30", "14:00", "16:15", "18:30"], company: "Valle Sul" },
    ];

    return (
        <div className="flex-1">
            {/* Hero */}
            <section className="bg-secondary/40 py-12 border-b border-gold/20">
                <div className="container mx-auto px-4 text-center">
                    <Bus size={48} className="text-gold mx-auto mb-4" />
                    <h1 className="text-4xl md:text-5xl font-serif mb-2 text-gradient">Horários de Ônibus</h1>
                    <p className="text-foreground/70 max-w-2xl mx-auto">
                        Informações atualizadas das principais linhas que conectam o Vale do Ribeira.
                    </p>
                </div>
            </section>

            <div className="container mx-auto py-12 px-4">
                {/* Aviso */}
                <div className="bg-accent/20 border border-accent/40 p-4 rounded-lg mb-8 flex items-start gap-3">
                    <AlertTriangle className="text-accent shrink-0 mt-1" />
                    <p className="text-sm">
                        <span className="font-bold">Aviso:</span> Os horários podem sofrer alterações sem aviso prévio pelas empresas.
                        Recomendamos chegar à rodoviária com 15 minutos de antecedência.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {routes.map((route, idx) => (
                        <Card key={idx} className="bg-secondary/20 hover:border-gold/30 transition-colors">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold/10 px-2 py-1 rounded">
                                        {route.company}
                                    </span>
                                    <div className="flex items-center gap-1 text-xs text-foreground/50">
                                        <Clock size={12} /> Atualizado em Jan/2026
                                    </div>
                                </div>
                                <CardTitle className="text-2xl flex items-center gap-3 font-serif">
                                    {route.from} <ArrowRight size={20} className="text-gold" /> {route.to}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {route.times.map((time, tIdx) => (
                                        <div key={tIdx} className="bg-background border border-primary/20 px-4 py-2 rounded-md font-mono text-lg text-primary">
                                            {time}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Informações de Contato Rodoviárias */}
                <section className="mt-16">
                    <h2 className="text-2xl font-serif mb-6 flex items-center gap-2">
                        <Info className="text-gold" />
                        Contatos das Rodoviárias
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <RodoviariaCard city="Registro" phone="(13) 3821-2244" />
                        <RodoviariaCard city="Pariquera-Açu" phone="(13) 3856-1234" />
                        <RodoviariaCard city="Iguape" phone="(13) 3841-5678" />
                    </div>
                </section>
            </div>

            <WhatsAppFAB />
        </div>
    );
}

function RodoviariaCard({ city, phone }) {
    return (
        <div className="p-4 rounded-xl border border-primary/10 bg-secondary/10">
            <h4 className="font-bold text-primary mb-1">{city}</h4>
            <p className="text-foreground/80 flex items-center gap-2">
                <MapPin size={14} className="text-gold" /> Rodoviária Central
            </p>
            <p className="text-foreground/80 flex items-center gap-2">
                <Clock size={14} className="text-gold" /> {phone}
            </p>
        </div>
    );
}
