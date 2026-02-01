import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar, Briefcase, GraduationCap, MessageSquare, BookOpen, UserCircle } from "lucide-react";
import WhatsAppFAB from "@/components/WhatsAppFAB";

export default function AcademicoPage() {
    return (
        <div className="flex-1">
            {/* Hero Section */}
            <section className="relative h-[45vh] flex items-center justify-center overflow-hidden border-b border-gold/30">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521791136064-7986c2959663?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50"></div>
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-5xl md:text-7xl font-serif mb-4 text-gradient">Acadêmico Direito</h1>
                    <p className="text-xl md:text-2xl text-foreground/70 font-light">O futuro do Direito no Vale do Ribeira começa aqui</p>
                </div>
            </section>

            <div className="container mx-auto py-16 px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Column */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Mural de Estágios */}
                        <section>
                            <h2 className="text-3xl font-serif mb-6 flex items-center gap-3">
                                <Briefcase className="text-gold" />
                                Mural de Estágios e Oportunidades
                            </h2>
                            <div className="space-y-4">
                                <OpportunityCard
                                    title="Estágio em Direito Civil"
                                    entity="Escritório Suyama & Associados"
                                    location="Registro/SP"
                                    remuneration="R$ 1.200,00 + Auxílio"
                                />
                                <OpportunityCard
                                    title="Vaga para Recém-Formatado"
                                    entity="Ministério Público (Estágio Pós)"
                                    location="Jacupiranga/SP"
                                    remuneration="Bolsa Auxílio Ativa"
                                />
                            </div>
                        </section>

                        {/* Voz do Aluno */}
                        <section>
                            <h2 className="text-3xl font-serif mb-6 flex items-center gap-3">
                                <MessageSquare className="text-gold" />
                                Voz do Aluno
                            </h2>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Espaço para Publicação de Artigos</CardTitle>
                                    <CardDescription>Quer ver seu artigo jurídico publicado no Hermeneuta? Envie para nossa equipe editorial.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button variant="gold" className="w-full">Submeter Artigo Acadêmico</Button>
                                </CardContent>
                            </Card>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-8">
                        <section>
                            <h3 className="text-2xl font-serif mb-6 flex items-center gap-2">
                                <Calendar className="text-gold" />
                                Congressos e Eventos
                            </h3>
                            <div className="space-y-4">
                                <EventItem
                                    date="15 MAI"
                                    title="III Simpósio de Direito Regional"
                                    description="Auditório da UNISEPE"
                                />
                                <EventItem
                                    date="22 JUN"
                                    title="Webinar: Reforma Tributária"
                                    description="Online via Zoom"
                                />
                            </div>
                        </section>

                        <Card className="bg-primary/5 border-primary/30">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <BookOpen className="text-gold" size={20} />
                                    Biblioteca Virtual
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-foreground/70 mb-4">Acesse resumos, modelos de petição e jurisprudência comentada.</p>
                                <Button variant="outline" size="sm" className="w-full">Acessar Materiais</Button>
                            </CardContent>
                        </Card>
                    </aside>
                </div>
            </div>

            <WhatsAppFAB />
        </div>
    );
}

function OpportunityCard({ title, entity, location, remuneration }) {
    return (
        <Card className="hover:bg-secondary/30 transition-colors border-l-4 border-l-gold">
            <CardContent className="p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h4 className="text-xl font-bold text-primary mb-1">{title}</h4>
                        <p className="text-foreground/80 mb-2 font-semibold">{entity}</p>
                        <div className="flex gap-4 text-sm text-foreground/60">
                            <span className="flex items-center gap-1"><MapPin size={14} /> {location}</span>
                            <span className="flex items-center gap-1 font-bold text-gold">{remuneration}</span>
                        </div>
                    </div>
                    <Button size="sm" variant="outline">Candidatar-se</Button>
                </div>
            </CardContent>
        </Card>
    );
}

function MapPin({ size }) {
    return <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />;
}

function EventItem({ date, title, description }) {
    return (
        <div className="flex gap-4 items-center p-3 rounded-lg hover:bg-secondary/40 transition-colors">
            <div className="bg-primary text-black font-bold p-2 rounded flex flex-col items-center min-w-[60px]">
                <span className="text-xs uppercase leading-none">{date.split(' ')[1]}</span>
                <span className="text-xl leading-none">{date.split(' ')[0]}</span>
            </div>
            <div>
                <h4 className="font-bold text-sm leading-tight">{title}</h4>
                <p className="text-xs text-foreground/60">{description}</p>
            </div>
        </div>
    );
}
