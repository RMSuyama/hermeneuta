import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Phone, MapPin, Calendar, BookOpen, GraduationCap, Briefcase, MessageSquare, Bus, Scale, ArrowRight, Star } from "lucide-react";
import WhatsAppFAB from "@/components/WhatsAppFAB";

export default function Home() {
    return (
        <div className="flex-1">
            {/* Hero Section - Optimized for Mobile */}
            <section className="relative h-[50vh] md:h-[70vh] flex items-center justify-center overflow-hidden border-b border-gold/30">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 scale-110 animate-pulse-slow"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background"></div>

                {/* Decorative Elements */}
                <div className="absolute top-10 left-10 w-32 h-32 bg-gold/10 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-10 right-10 w-48 h-48 bg-primary/20 rounded-full blur-3xl animate-float-delayed"></div>

                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] md:text-xs uppercase tracking-widest mb-6 animate-fade-in">
                        <Star size={12} fill="currentColor" />
                        O Portal de Conexão Jurídica do Vale
                    </div>
                    <h1 className="text-5xl md:text-9xl font-serif mb-4 text-gradient drop-shadow-2xl animate-title-slide">
                        Hermeneuta
                    </h1>
                    <p className="text-base md:text-2xl text-foreground/70 tracking-[0.2em] md:tracking-[0.5em] uppercase mb-10 font-light animate-fade-in-delayed">
                        Hub Jurídico <span className="text-gold">Regional</span>
                    </p>
                    <div className="flex flex-col md:flex-row justify-center gap-4 animate-fade-in-up">
                        <Button variant="gold" size="xl" className="group" asChild>
                            <a href="/oab-registro">
                                Portal OAB Registro
                                <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                            </a>
                        </Button>
                        <Button variant="outline" size="xl" className="border-gold/30 text-gold hover:bg-gold/10 bg-background/5" asChild>
                            <a href="/academico-direito">Acadêmico Direito</a>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Main Hub Grid */}
            <section className="container mx-auto py-12 md:py-24 px-6">
                <div className="text-center mb-16 md:mb-20">
                    <h2 className="text-3xl md:text-5xl font-serif mb-4 uppercase tracking-tighter text-gold">Plataforma Integrada</h2>
                    <div className="h-1 w-24 bg-gold mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                    {/* OAB Subsections */}
                    <SubsecaoCard city="Registro" href="/oab-registro" description="Sede administrativa e serviços para a maior comarca do Vale." />
                    <SubsecaoCard city="Jacupiranga" href="/oab-jacupiranga" description="Informações processuais e suporte local aos advogados." />
                    <SubsecaoCard city="Iguape" href="/oab-iguape" description="Comarca histórica com atendimento jurídico especializado." />

                    {/* Action Items */}
                    <ActionCard
                        title="Horários de Ônibus"
                        description="Planeje seus deslocamentos entre fóruns com horários atualizados."
                        icon={<Bus className="text-gold" size={32} />}
                        href="/horarios-onibus"
                    />
                    <ActionCard
                        title="Balcão de Empregos"
                        description="Encontre estagiários ou novas oportunidades de carreira jurídica."
                        icon={<Briefcase className="text-gold" size={32} />}
                        href="/balcao-oportunidades"
                    />
                    <ActionCard
                        title="Central de Diligências"
                        description="A maior rede de correspondentes do Vale em um só lugar."
                        icon={<Scale className="text-gold" size={32} />}
                        href="/central-diligencias"
                    />
                </div>
            </section>

            <WhatsAppFAB />
        </div>
    );
}

function SubsecaoCard({ city, href, description }) {
    return (
        <Card className="group relative overflow-hidden transition-all duration-500 hover:-translate-y-3 border-primary/20 hover:border-gold/50 bg-secondary/5 shadow-xl">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Scale size={100} />
            </div>
            <CardHeader className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4 text-gold group-hover:bg-gold group-hover:text-black transition-colors duration-500">
                    <MapPin size={24} />
                </div>
                <CardTitle className="text-2xl font-serif">OAB {city}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">{description}</CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
                <Button variant="link" className="text-gold p-0 group-hover:translate-x-2 transition-transform" asChild>
                    <a href={href} className="flex items-center gap-2">
                        Acessar Portal Local <ArrowRight size={16} />
                    </a>
                </Button>
            </CardContent>
        </Card>
    );
}

function ActionCard({ title, description, icon, href }) {
    return (
        <Card className="group relative overflow-hidden hover:-translate-y-3 transition-all duration-500 bg-primary/5 border-gold/20 hover:border-gold/60 shadow-lg">
            <div className="absolute -bottom-6 -right-6 opacity-5 group-hover:scale-125 transition-transform duration-700">
                {icon}
            </div>
            <CardHeader>
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-500">
                    {icon}
                </div>
                <CardTitle className="text-2xl font-serif text-primary group-hover:text-gold transition-colors">{title}</CardTitle>
                <CardDescription className="line-clamp-2">{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Button className="w-full bg-gold/10 hover:bg-gold text-gold hover:text-black border border-gold/40 transition-all font-bold uppercase tracking-widest text-xs" asChild>
                    <a href={href}>Acessar Agora</a>
                </Button>
            </CardContent>
        </Card>
    );
}
