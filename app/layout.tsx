import './src/globals.css';
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
    title: 'Hermeneuta - Hub Jurídico Regional do Vale do Ribeira',
    description: 'O portal definitivo para o profissional e estudante de Direito no Vale do Ribeira. OAB Registro, Jacupiranga, Iguape e Conteúdo Acadêmico.',
    keywords: 'Advogado no Vale do Ribeira, OAB Registro SP, Direito Vale do Ribeira, OAB Jacupiranga, OAB Iguape',
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
