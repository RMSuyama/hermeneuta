import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, User, ArrowLeft, MapPin } from "lucide-react";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import ShareButton from "@/components/ShareButton";
import { mockNews } from "@/src/data/mockNews";

export async function generateMetadata({ params }) {
    const { id } = params;
    const article = mockNews.find(n => n.id.toString() === id);
    if (!article) return { title: 'Notícia não encontrada | Hermeneuta' };

    return {
        title: `${article.title} | Hermeneuta`,
        description: article.excerpt,
        openGraph: {
            title: article.title,
            description: article.excerpt,
            images: [article.image],
        },
    };
}

export default function ArticlePage({ params }) {
    const { id } = params;
    const article = mockNews.find(n => n.id.toString() === id);

    if (!article) {
        return (
            <div className="container mx-auto py-20 px-4 text-center">
                <h1 className="text-4xl font-serif mb-4 text-white">Notícia não encontrada</h1>
                <Button variant="gold" asChild>
                    <a href="/">Voltar para a Home</a>
                </Button>
            </div>
        );
    }

    return (
        <div className="flex-1">
            <section className="container mx-auto py-8 md:py-16 px-4 max-w-4xl">
                <Button variant="link" className="text-gold p-0 mb-8 flex items-center gap-2" asChild>
                    <a href="/"><ArrowLeft size={16} /> Voltar para o Início</a>
                </Button>

                <article className="space-y-8 animate-fade-in">
                    <div className="space-y-4">
                        <span className="text-xs font-bold text-gold uppercase tracking-[0.3em]">{article.category}</span>
                        <h1 className="text-4xl md:text-6xl font-serif leading-tight text-white">{article.title}</h1>

                        <div className="flex flex-wrap items-center gap-6 text-foreground/50 text-sm border-y border-gold/10 py-4 mt-8">
                            <span className="flex items-center gap-2"><Calendar size={14} /> {article.date}</span>
                            <span className="flex items-center gap-2"><User size={14} /> {article.author}</span>
                            <div className="flex-1 flex justify-end">
                                <ShareButton title={article.title} />
                            </div>
                        </div>
                    </div>

                    {article.image && (
                        <div className="relative aspect-video rounded-3xl overflow-hidden border border-gold/20">
                            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                        </div>
                    )}

                    <div
                        className="text-lg md:text-xl leading-relaxed text-foreground/80 font-serif whitespace-pre-line space-y-6 article-content"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />

                    <div className="bg-primary/5 p-8 rounded-3xl border border-gold/10 mt-12 flex items-center gap-6">
                        <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center text-gold">
                            <User size={32} />
                        </div>
                        <div>
                            <p className="font-bold text-lg text-white">{article.author}</p>
                            <p className="text-sm text-foreground/50">Colaborador Jurídico do Hermeneuta</p>
                        </div>
                    </div>
                </article>
            </section>

            <WhatsAppFAB />
        </div>
    );
}
