import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { UserCircle, MapPin, Scale, MessageSquare, Phone, ShieldCheck, Star } from "lucide-react";
import WhatsAppFAB from "@/components/WhatsAppFAB";

export default function CentralDiligencias() {
    const professionals = [
        {
            name: "Dra. Beatriz Santos",
            role: "Advogada Correspondente",
            cities: ["Registro", "Pariquera-Açu", "Jacupiranga"],
            services: ["Audiências", "Protocolos", "Cargas"],
            rating: 5,
            completed: 124,
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80"
        },
        {
            name: "Dr. Ricardo Oliveira",
            role: "Advogado Correspondente",
            cities: ["Cananéia", "Iguape", "Ilha Comprida"],
            services: ["Audiências", "Cópias de Processo"],
            rating: 4.8,
            completed: 89,
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80"
        },
        {
            name: "Marcus Vinícius",
            role: "Bacharel / Preposto",
            cities: ["Registro"],
            services: ["Protocolos", "Distribuições"],
            rating: 4.9,
            completed: 215,
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
        }
    ];

    return (
        <div className="flex-1">
            {/* Hero */}
            <section className="bg-background py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/5 blur-[100px]"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl md:text-7xl font-serif mb-6 text-gradient italic">Central de Diligências</h1>
                        <p className="text-xl md:text-2xl text-foreground/80 mb-8 font-light">
                            Precisa de um correspondente no Vale do Ribeira?
                            Encontre profissionais qualificados para audiências, protocolos e diligências em todas as comarcas da região.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button variant="gold" size="lg" className="h-14 px-8 text-lg">Quero contratar agora</Button>
                            <Button variant="outline" size="lg" className="h-14 px-8 text-lg border-gold/30">Ser um correspondente</Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Busca Rápida */}
            <section className="container mx-auto -translate-y-10 px-4">
                <div className="bg-secondary p-4 rounded-2xl border border-gold/30 shadow-2xl flex flex-wrap gap-4 items-center">
                    <div className="flex-1 min-w-[200px]">
                        <label className="text-[10px] uppercase tracking-widest text-gold font-bold ml-2">Qual Comarca?</label>
                        <select className="w-full bg-transparent text-foreground border-none focus:ring-0 text-xl font-serif">
                            <option>Registro (Sede)</option>
                            <option>Jacupiranga</option>
                            <option>Iguape</option>
                            <option>Cananéia</option>
                        </select>
                    </div>
                    <div className="w-px h-12 bg-gold/20 hidden md:block"></div>
                    <div className="flex-1 min-w-[200px]">
                        <label className="text-[10px] uppercase tracking-widest text-gold font-bold ml-2">Tipo de Serviço?</label>
                        <select className="w-full bg-transparent text-foreground border-none focus:ring-0 text-xl font-serif">
                            <option>Audiência Conciliação</option>
                            <option>Audiência Instrução</option>
                            <option>Cópia / Protocolo</option>
                            <option>Despacho com Juiz</option>
                        </select>
                    </div>
                    <Button variant="gold" className="h-12 px-10">Buscar Profissionais</Button>
                </div>
            </section>

            {/* Lista de Profissionais */}
            <section className="container mx-auto py-12 px-4">
                <h2 className="text-3xl font-serif mb-10 flex items-center gap-3">
                    <ShieldCheck className="text-gold" /> Correspondentes Verificados
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {professionals.map((pro, idx) => (
                        <Card key={idx} className="bg-secondary/20 border-gold/10 hover:border-gold/40 transition-all overflow-hidden group">
                            <div className="h-48 overflow-hidden relative">
                                <img src={pro.image} alt={pro.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent"></div>
                                <div className="absolute bottom-4 left-4">
                                    <h3 className="text-2xl font-serif text-primary">{pro.name}</h3>
                                    <p className="text-sm text-foreground/70 uppercase tracking-tighter">{pro.role}</p>
                                </div>
                            </div>
                            <CardContent className="pt-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1 text-gold">
                                        <Star size={14} className="fill-current" />
                                        <span className="font-bold">{pro.rating}</span>
                                        <span className="text-foreground/40 text-xs">({pro.completed} concluídas)</span>
                                    </div>
                                    <ShieldCheck size={18} className="text-green-500" />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-start gap-2 text-sm">
                                        <MapPin size={16} className="text-gold shrink-0 mt-0.5" />
                                        <span className="text-foreground/80">{pro.cities.join(", ")}</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm">
                                        <Scale size={16} className="text-gold shrink-0 mt-0.5" />
                                        <span className="text-foreground/80">{pro.services.join(", ")}</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="gap-2 border-t border-gold/10 pt-4">
                                <Button variant="outline" className="flex-1 gap-2 border-gold/20">
                                    <UserCircle size={16} /> Ver Perfil
                                </Button>
                                <Button variant="gold" className="flex-1 gap-2">
                                    <MessageSquare size={16} /> Contatar
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </section>

            <WhatsAppFAB />
        </div>
    );
}
