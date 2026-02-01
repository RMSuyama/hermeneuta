import '../src/globals.css';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-sans',
});

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-serif',
});

export const metadata = {
    title: {
        default: 'Hermeneuta - Hub Jurídico Regional do Vale do Ribeira',
        template: '%s | Hermeneuta'
    },
    description: 'Portal definitivo para advogados e estudantes de Direito no Vale do Ribeira. OAB Registro, Jacupiranga, Iguape e Conteúdo Acadêmico.',
    keywords: ['Advogado no Vale do Ribeira', 'OAB Registro SP', 'OAB Jacupiranga', 'OAB Iguape', 'Direito Vale do Ribeira', 'Correspondente Jurídico Vale do Ribeira'],
    authors: [{ name: 'Hermeneuta Team' }],
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-br" className={`${inter.variable} ${playfair.variable}`}>
            <body className="bg-background text-foreground min-h-screen flex flex-col">
                {children}
            </body>
        </html>
    );
}
