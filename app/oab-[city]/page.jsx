import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Phone, MapPin, Calendar, ShieldCheck, Scale, Info, Newspaper, Share2 } from "lucide-react";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import ShareButton from "@/components/ShareButton";

const CITY_DATA = {
    registro: {
        name: "Registro",
        image: "https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&q=80",
        address: "Av. Prefeito Jonas Banks Leite, 580 - Centro, Registro - SP",
        forum: "Rua Tamekishi Nakayama, 203 - Vila Tupi",
        prerogativas: "(13) 99763-8888",
        esa: "https://esasp.oabsp.org.br/"
    },
    jacupiranga: {
        name: "Jacupiranga",
        image: "https://images.unsplash.com/photo-1588636401662-724f8c857476?auto=format&fit=crop&q=80",
        address: "Rua José Amâncio de Macedo, 137 - Centro, Jacupiranga - SP",
        forum: "Av. 23 de Setembro, 200 - Centro",
        prerogativas: "(13) 99654-1111",
        esa: "https://esasp.oabsp.org.br/"
    },
    iguape: {
        name: "Iguape",
        image: "https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?auto=format&fit=crop&q=80",
        address: "Rua das Neves, 21 - Centro, Iguape - SP",
        forum: "Rua das Neves, 1 - Centro",
        prerogativas: "(13) 99722-0000",
        esa: "https://esasp.oabsp.org.br/"
    }
};

const MOCK_NEWS = [
    { id: 1, city: 'registro', title: "Nova Sala do Advogado é inaugurada em Registro", date: "01 Fev 2024" },
    { id: 2, city: 'registro', title: "Subseção de Registro solicita melhorias no Fórum Cível", date: "30 Jan 2024" },
    { id: 3, city: 'jacupiranga', title: "OAB Jacupiranga promove ciclo de palestras sobre Direito Penal", date: "31 Jan 2024" },
    { id: 4, city: 'iguape', title: "Justiça Itinerante atende moradores da zona rural de Iguape", date: "29 Jan 2024" },
];

export async function generateStaticParams() {
    return [
        { city: 'registro' },
        { city: 'jacupiranga' },
        { city: 'iguape' },
    ];
}

export async function generateMetadata({ params }) {
    const { city } = params;

    // Guard for build phase or unexpected params
    if (!city || !CITY_DATA[city]) {
        return {
            title: 'Subseção OAB | Hermeneuta',
            description: 'Informações das subseções da OAB no Vale do Ribeira.'
        };
    }

    const name = CITY_DATA[city].name;
    return {
        title: `OAB ${name} - Hub Jurídico Vale do Ribeira`,
        description: `Informações oficiais, Prerrogativas, Fórum e notícias da Subseção da OAB de ${name}/SP. O melhor suporte para o advogado no Vale.`,
    };
}

export default function OABPage({ params }) {
    const { city } = params;
    const data = CITY_DATA[city] || CITY_DATA.registro;
    const cityNews = MOCK_NEWS.filter(n => n.city === city);

    return (
        <div className="flex-1">
            {/* Hero Section - Optimized for Mobile */}
            <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden border-b border-gold/30">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40 transition-transform duration-700 hover:scale-105"
                    style={{ backgroundImage: `url('${data.image}')` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
                <div className="relative z-10 text-center px-4">
                    <div className="flex justify-center mb-2 md:mb-4">
                        <Scale size={48} className="text-gold md:w-16 md:h-16" />
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <h1 className="text-3xl md:text-6xl font-serif mb-1 text-gradient uppercase tracking-widest">Subseção da OAB</h1>
                        <p className="text-2xl md:text-4xl font-serif text-foreground/90 italic">{data.name}</p>
                        <div className="mt-4">
                            <ShareButton title={`OAB ${data.name} - Hub Jurídico Vale do Ribeira`} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Utilidade Pública Grid */}
            <section className="container mx-auto py-8 md:py-12 px-4">
                <h2 className="text-2xl md:text-3xl font-serif mb-6 md:mb-8 flex items-center gap-2 text-gold">
                    <Info size={24} />
                    Utilidade Pública
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    <UtilidadeCard
                        title="Endereço do Fórum"
                        icon={<MapPin />}
                        content={data.forum}
                        link={`https://www.google.com/maps/search/${encodeURIComponent(data.forum)}`}
                        linkText="Ver no Mapa"
                    />
                    <UtilidadeCard
                        title="Plantão Prerrogativas"
                        icon={<ShieldCheck />}
                        content={`Defesa 24h: ${data.prerogativas}`}
                        link={`tel:${data.prerogativas.replace(/\D/g, '')}`}
                        linkText="Ligar Agora"
                        highlight
                    />
                    <UtilidadeCard
                        title="Agenda da ESA"
                        icon={<Calendar />}
                        content="Cursos e especializações para advogados da região."
                        link={data.esa}
                        linkText="Ver Cursos"
                    />
                </div>
            </section>

            {/* Notícias Locais Feed */}
            <section className="container mx-auto py-8 md:py-12 px-4 bg-secondary/10 rounded-3xl mb-12 border border-gold/10">
                <h2 className="text-2xl md:text-3xl font-serif mb-8 text-center uppercase tracking-widest text-gold flex items-center justify-center gap-3">
                    <Newspaper size={28} />
                    Notícias de {data.name}
                </h2>

                {cityNews.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {cityNews.map(news => (
                            <Card key={news.id} className="bg-primary/5 hover:bg-primary/10 transition-colors border-gold/10">
                                <CardHeader>
                                    <div className="text-xs text-gold/60 mb-2 uppercase">{news.date}</div>
                                    <CardTitle className="text-lg md:text-xl font-serif leading-tight">
                                        {news.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Button variant="link" className="text-gold p-0" asChild>
                                        <a href={`/news/${news.id}`}>Ler na íntegra &rarr;</a>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <p className="text-foreground/50 italic font-serif text-lg">
                            Nenhuma notícia específica de {data.name} no momento.
                        </p>
                    </div>
                )}
            </section>

            <WhatsAppFAB />
        </div>
    );
}

function UtilidadeCard({ title, icon, content, link, linkText, highlight = false }) {
    return (
        <Card className={`group transition-all duration-300 ${highlight ? "border-gold/60 bg-gold/5 shadow-[0_0_15px_rgba(212,175,55,0.1)]" : "hover:border-gold/30"}`}>
            <CardHeader>
                <CardTitle className="text-lg md:text-xl flex items-center gap-2">
                    <span className="text-gold">{icon}</span>
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="mb-4 text-foreground/80 text-sm md:text-base leading-relaxed">{content}</p>
                <Button variant={highlight ? "gold" : "outline"} className={`w-full ${highlight ? "shadow-lg" : "border-gold/30 text-gold hover:bg-gold/10"}`} asChild>
                    <a href={link} target="_blank" rel="noopener noreferrer">{linkText}</a>
                </Button>
            </CardContent>
        </Card>
    );
}
