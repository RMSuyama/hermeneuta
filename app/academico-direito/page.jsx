import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar, Briefcase, GraduationCap, MessageSquare, BookOpen, UserCircle, MapPin, ArrowRight, Award } from "lucide-react";
import WhatsAppFAB from "@/components/WhatsAppFAB";

export default function AcademicoPage() {
    return (
        <div className="flex-1">
            {/* Hero Section - Optimized Mobile */}
            <section className="relative h-[35vh] md:h-[45vh] flex items-center justify-center overflow-hidden border-b border-gold/30">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521791136064-7986c2959663?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
                <div className="relative z-10 text-center px-4">
                    <GraduationCap size={48} className="text-gold mx-auto mb-4 md:w-16 md:h-16" />
                    <h1 className="text-4xl md:text-7xl font-serif mb-2 text-gradient tracking-tight uppercase">Acadêmico Direito</h1>
                    <p className="text-lg md:text-2xl text-foreground/70 font-light max-w-2xl mx-auto italic">Capacitação e conexão para os bacharéis e estudantes do Vale do Ribeira.</p>
                </div>
            </section>

            <div className="container mx-auto py-8 md:py-16 px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                    {/* Main Column */}
                    <div className="lg:col-span-2 space-y-10 md:space-y-16">

                        {/* Mural de Estágios */}
                        <section id="estagios">
                            <div className="flex justify-between items-end mb-8">
                                <h2 className="text-2xl md:text-3xl font-serif flex items-center gap-3 text-gold uppercase tracking-widest">
                                    <Briefcase size={28} />
                                    Mural de Estágios
                                </h2>
                                <Button variant="link" className="text-gold hidden md:flex items-center gap-1">Ver todos <ArrowRight size={16} /></Button>
                            </div>
                            <div className="grid gap-4">
                                <OpportunityCard
                                    title="Estágio em Direito Civil e Família"
                                    entity="Escritório Suyama & Associados"
                                    location="Registro/SP"
                                    remuneration="R$ 1.200,00 + VT"
                                    type="Estágio"
                                />
                                <OpportunityCard
                                    title="Auxiliar Jurídico (Recém-Formado)"
                                    entity="Indústria de Alimentos Vale"
                                    location="Jacupiranga/SP"
                                    remuneration="Salário Compatível"
                                    type="CLT"
                                />
                                <OpportunityCard
                                    title="Estagiário de Pós-Graduação"
                                    entity="Defensoria Pública do Estado"
                                    location="Iguape/SP"
                                    remuneration="Bolsa Auxílio Ativa"
                                    type="Pós-Graduação"
                                />
                            </div>
                            <Button variant="outline" className="w-full mt-6 border-gold/30 text-gold md:hidden">Ver Todas as Oportunidades</Button>
                        </section>

                        {/* Voz do Aluno */}
                        <section id="voz-do-aluno" className="bg-primary/5 p-6 md:p-8 rounded-3xl border border-gold/20 shadow-2xl">
                            <h2 className="text-2xl md:text-3xl font-serif mb-6 flex items-center gap-3 text-gold uppercase tracking-widest">
                                <MessageSquare size={28} />
                                Voz do Aluno
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                <ArticlePreview
                                    title="A Virtualização dos Processos no Vale do Ribeira"
                                    author="Ana Paula Souza (UNISEPE)"
                                    date="Jan 2024"
                                />
                                <ArticlePreview
                                    title="Direito Ambiental e as Comunidades Tradicionais"
                                    author="Marcos Silva (Faculdade Vale)"
                                    date="Dez 2023"
                                />
                            </div>
                            <Card className="bg-background/50 border-gold/40">
                                <CardHeader className="text-center">
                                    <CardTitle className="text-xl">Publique seu Artigo</CardTitle>
                                    <CardDescription>Ganhe visibilidade na comunidade jurídica. Submeta seu trabalho para análise.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button variant="gold" className="w-full shadow-lg">Submeter Trabalho &rarr;</Button>
                                </CardContent>
                            </Card>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-8">
                        <section className="bg-secondary/20 p-6 rounded-3xl border border-white/5">
                            <h3 className="text-xl md:text-2xl font-serif mb-6 flex items-center gap-2 text-gold">
                                <Calendar size={24} />
                                Próximos Eventos
                            </h3>
                            <div className="space-y-4">
                                <EventItem
                                    day="15"
                                    month="MAI"
                                    title="III Simpósio de Direito Regional"
                                    location="Auditório da UNISEPE"
                                    highlight
                                />
                                <EventItem
                                    day="22"
                                    month="JUN"
                                    title="Webinar: Reforma Tributária"
                                    location="Plataforma Digital OAB"
                                />
                                <EventItem
                                    day="10"
                                    month="AGO"
                                    title="Juri Simulado: Edição Vale"
                                    location="Fórum de Registro"
                                />
                            </div>
                            <Button variant="link" className="text-gold w-full mt-4">Ver Calendário Completo</Button>
                        </section>

                        <Card className="bg-gold/10 border-gold/30 overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-2 opacity-20">
                                <Award size={80} className="text-gold" />
                            </div>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <BookOpen className="text-gold" size={20} />
                                    Biblioteca do Estudante
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="relative z-10">
                                <p className="text-sm text-foreground/70 mb-4">Modelos de petição, resumos para OAB e materiais de apoio.</p>
                                <Button variant="gold" size="sm" className="w-full">Acessar Repositório</Button>
                            </CardContent>
                        </Card>

                        <div className="p-6 rounded-2xl border border-gold/20 bg-primary/5">
                            <h4 className="font-serif text-gold mb-2 flex items-center gap-2 italic">
                                <UserCircle size={18} />
                                Dica do Mestre
                            </h4>
                            <p className="text-xs text-foreground/60 leading-relaxed italic">
                                "A prática jurídica no interior exige agilidade e conhecimento humano. Aproveite os estágios locais para entender a realidade do nosso Judiciário."
                            </p>
                        </div>
                    </aside>
                </div>
            </div>

            <WhatsAppFAB />
        </div>
    );
}

function OpportunityCard({ title, entity, location, remuneration, type }) {
    return (
        <Card className="hover:bg-secondary/30 transition-all duration-300 border-l-4 border-l-gold group">
            <CardContent className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] bg-gold/20 text-gold px-2 py-0.5 rounded-full font-bold uppercase">{type}</span>
                            <span className="text-[10px] text-foreground/40 font-bold uppercase">{location}</span>
                        </div>
                        <h4 className="text-lg md:text-xl font-bold group-hover:text-gold transition-colors">{title}</h4>
                        <p className="text-foreground/70 text-sm">{entity}</p>
                    </div>
                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-2">
                        <span className="font-bold text-gold text-sm md:text-base">{remuneration}</span>
                        <Button size="sm" variant="outline" className="border-gold/30 hover:bg-gold hover:text-black">Candidatar-se</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function ArticlePreview({ title, author, date }) {
    return (
        <div className="border border-gold/10 p-4 rounded-xl hover:bg-gold/5 transition-colors cursor-pointer group">
            <h4 className="font-serif text-lg leading-snug mb-2 group-hover:text-gold transition-colors">{title}</h4>
            <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-foreground/40">
                <span>{author}</span>
                <span>{date}</span>
            </div>
        </div>
    );
}

function EventItem({ day, month, title, location, highlight = false }) {
    return (
        <div className={`flex gap-4 items-center p-3 rounded-xl transition-all ${highlight ? "bg-gold/10 border border-gold/20" : "hover:bg-white/5"}`}>
            <div className={`flex flex-col items-center min-w-[50px] p-1.5 rounded-lg ${highlight ? "bg-gold text-black" : "bg-primary/20 text-gold"}`}>
                <span className="text-[10px] font-bold leading-none">{month}</span>
                <span className="text-lg font-bold leading-none">{day}</span>
            </div>
            <div className="min-w-0">
                <h4 className={`font-bold text-sm leading-tight truncate ${highlight ? "text-white" : "text-foreground/90"}`}>{title}</h4>
                <p className="text-[10px] text-foreground/50 truncate flex items-center gap-1">
                    <MapPin size={10} /> {location}
                </p>
            </div>
        </div>
    );
}
