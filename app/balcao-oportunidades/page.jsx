import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Briefcase, MapPin, DollarSign, Calendar, Filter, Plus, Search, HelpCircle } from "lucide-react";
import WhatsAppFAB from "@/components/WhatsAppFAB";

export default function BalcaoOportunidades() {
    const jobs = [
        {
            title: "Advogado Júnior - Cível",
            firm: "Oliveira & Suyama Advogados",
            location: "Registro/SP",
            salary: "R$ 3.500,00 + Bônus",
            type: "CLT",
            posted: "2 dias atrás",
            description: "Atuação em contencioso cível e elaboração de peças processuais."
        },
        {
            title: "Estagiário de Direito",
            firm: "Fórum de Registro - 1ª Vara Cível",
            location: "Registro/SP",
            salary: "R$ 1.050,00 + Aux",
            type: "Estágio",
            posted: "Hoje",
            description: "Auxílio no atendimento ao balcão e movimentação de processos."
        },
        {
            title: "Correspondente Jurídico",
            firm: "Agência Nacional de Direito",
            location: "Jacupiranga/SP",
            salary: "Por Diligência",
            type: "Freelancer",
            posted: "1 semana atrás",
            description: "Realização de audiências e protocolos na comarca de Jacupiranga."
        },
        {
            title: "Bacharel em Direito - Auxiliar",
            firm: "Cartório de Notas",
            location: "Iguape/SP",
            salary: "A combinar",
            type: "Efetivo",
            posted: "3 dias atrás",
            description: "Atendimento ao público e redação de escrituras sob supervisão."
        }
    ];

    return (
        <div className="flex-1">
            {/* Hero Section */}
            <section className="relative py-16 overflow-hidden border-b border-gold/20">
                <div className="absolute inset-0 bg-gold/5 blur-[120px] rounded-full -translate-y-1/2"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="text-left max-w-2xl">
                            <h1 className="text-5xl md:text-6xl font-serif mb-4 text-gradient">Balcão de Oportunidades</h1>
                            <p className="text-xl text-foreground/70 mb-8">
                                Conectando talentos jurídicos às melhores vagas no Vale do Ribeira.
                                Estágios, carreiras e parcerias.
                            </p>
                            <div className="flex gap-4">
                                <Button variant="gold" size="lg" className="flex items-center gap-2">
                                    <Plus size={20} /> Anunciar Vaga
                                </Button>
                                <Button variant="outline" size="lg" className="border-gold/30">
                                    Cadastrar Currículo
                                </Button>
                            </div>
                        </div>
                        <div className="bg-secondary/30 p-8 rounded-3xl border border-gold/20 backdrop-blur-sm max-w-sm w-full">
                            <h3 className="text-xl font-serif mb-4 flex items-center gap-2">
                                <Search size={20} className="text-gold" /> Filtrar Busca
                            </h3>
                            <div className="space-y-4">
                                <select className="w-full bg-background border border-gold/20 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold">
                                    <option>Todas as Cidades</option>
                                    <option>Registro</option>
                                    <option>Jacupiranga</option>
                                    <option>Iguape</option>
                                </select>
                                <select className="w-full bg-background border border-gold/20 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold">
                                    <option>Tipo de Contato</option>
                                    <option>Estágio</option>
                                    <option>CLT / Efetivo</option>
                                    <option>Correspondente</option>
                                </select>
                                <Button className="w-full bg-gold/20 hover:bg-gold/30 text-gold border border-gold/40">Aplicar Filtros</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vagas Grid */}
            <section className="container mx-auto py-12 px-4">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-serif flex items-center gap-3">
                        <Briefcase className="text-gold" /> Oportunidades Recentes
                    </h2>
                    <span className="text-foreground/50 text-sm">Mostrando {jobs.length} resultados</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {jobs.map((job, idx) => (
                        <Card key={idx} className="group hover:-translate-y-1 transition-all duration-300 border-primary/20 hover:border-gold/50 bg-secondary/10">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-2xl text-primary mb-1">{job.title}</CardTitle>
                                        <p className="font-semibold text-foreground/90">{job.firm}</p>
                                    </div>
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-tighter ${job.type === 'Estágio' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                            job.type === 'CLT' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                                'bg-gold/10 text-gold border border-gold/20'
                                        }`}>
                                        {job.type}
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-foreground/70 leading-relaxed italic border-l-2 border-gold/30 pl-3">
                                    "{job.description}"
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-2 text-sm text-foreground/60">
                                        <MapPin size={16} className="text-gold" /> {job.location}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gold font-bold">
                                        <DollarSign size={16} /> {job.salary}
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between border-t border-gold/10 pt-4">
                                <span className="text-xs text-foreground/40 flex items-center gap-1">
                                    <Calendar size={12} /> Postado {job.posted}
                                </span>
                                <Button variant="gold" size="sm">Candidatar-se</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <div className="mt-16 bg-gold/5 rounded-3xl p-12 text-center border border-gold/10">
                    <HelpCircle size={48} className="text-gold mx-auto mb-4" />
                    <h3 className="text-2xl font-serif mb-2">Não encontrou o que procurava?</h3>
                    <p className="text-foreground/70 mb-6">Nosso balcão é atualizado diariamente. Assine nosso alerta para novas vagas.</p>
                    <div className="flex max-w-md mx-auto gap-4">
                        <input
                            type="email"
                            placeholder="seu@email.com"
                            className="flex-1 bg-background border border-gold/20 rounded-lg px-4 focus:outline-none focus:ring-1 focus:ring-gold"
                        />
                        <Button variant="gold">Assinar Alertas</Button>
                    </div>
                </div>
            </section>

            <WhatsAppFAB />
        </div>
    );
}
