import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Book, Gavel, Scale, AlertCircle, Calculator, Database, Briefcase, FileText } from 'lucide-react';

const linksData = [
    {
        category: "Legislação, Jurisprudência e Fontes Oficiais",
        icon: <Scale size={20} />,
        items: [
            { name: "Planalto – Legislação Federal", url: "https://www.planalto.gov.br" },
            { name: "Supremo Tribunal Federal (STF)", url: "https://www.stf.jus.br" },
            { name: "Superior Tribunal de Justiça (STJ)", url: "https://www.stj.jus.br" },
            { name: "Conselho Nacional de Justiça (CNJ)", url: "https://www.cnj.jus.br" },
            { name: "Diário Oficial da União", url: "https://www.in.gov.br" },
            { name: "Tribunal Superior do Trabalho (TST)", url: "https://www.tst.jus.br" },
            { name: "Tribunal Superior Eleitoral (TSE)", url: "https://www.tse.jus.br" },
            { name: "Senado Federal – Legislação", url: "https://www25.senado.leg.br/web/atividade/legislacao" },
            { name: "Câmara dos Deputados – Proposições", url: "https://www.camara.leg.br" },
            { name: "LexML Brasil", url: "https://www.lexml.gov.br" }
        ]
    },
    {
        category: "Tribunais e Consulta Processual",
        icon: <Gavel size={20} />,
        items: [
            { name: "TJSP – Tribunal de Justiça de SP", url: "https://www.tjsp.jus.br" },
            { name: "TRF1 – Justiça Federal", url: "https://www.trf1.jus.br" },
            { name: "TRF3 – Justiça Federal", url: "https://www.trf3.jus.br" },
            { name: "PJe – Processo Judicial Eletrônico", url: "https://www.pje.jus.br" },
            { name: "e-SAJ", url: "https://esaj.tjsp.jus.br" },
            { name: "Projudi", url: "https://www.cnj.jus.br/sistemas/projudi" }
        ]
    },
    {
        category: "Advocacia, OAB e Prerrogativas",
        icon: <Briefcase size={20} />,
        items: [
            { name: "Conselho Federal da OAB", url: "https://www.oab.org.br" },
            { name: "OAB São Paulo", url: "https://www.oabsp.org.br" },
            { name: "OAB Rio de Janeiro", url: "https://www.oabrj.org.br" },
            { name: "ESA – Escola Superior da Advocacia", url: "https://www.esaoab.org.br" }
        ]
    },
    {
        category: "Doutrina, Artigos e Pesquisa Jurídica",
        icon: <Book size={20} />,
        items: [
            { name: "JusBrasil", url: "https://www.jusbrasil.com.br" },
            { name: "Conjur – Consultor Jurídico", url: "https://www.conjur.com.br" },
            { name: "Migalhas", url: "https://www.migalhas.com.br" },
            { name: "Revista dos Tribunais Online", url: "https://www.rtonline.com.br" },
            { name: "IBCCRIM", url: "https://www.ibccrim.org.br" },
            { name: "Scielo Brasil", url: "https://www.scielo.br" },
            { name: "Google Scholar", url: "https://scholar.google.com.br" },
            { name: "Academia.edu", url: "https://www.academia.edu" }
        ]
    },
    {
        category: "Notícias Jurídicas e Atualização Diária",
        icon: <AlertCircle size={20} />,
        items: [
            { name: "G1 – Justiça", url: "https://g1.globo.com/politica/justica" },
            { name: "Agência Brasil – Justiça", url: "https://agenciabrasil.ebc.com.br" },
            { name: "Jota", url: "https://www.jota.info" },
            { name: "Poder360 – Justiça", url: "https://www.poder360.com.br" },
            { name: "Estadão – Política e Justiça", url: "https://politica.estadao.com.br" }
        ]
    },
    {
        category: "Filosofia, Teoria Crítica e Direito & Sociedade",
        icon: <FileText size={20} />,
        items: [
            { name: "CartaCapital", url: "https://www.cartacapital.com.br" },
            { name: "Revista Cult", url: "https://revistacult.uol.com.br" },
            { name: "Boitempo Editorial", url: "https://www.boitempoeditorial.com.br" },
            { name: "Nexo Jornal", url: "https://www.nexojornal.com.br" }
        ]
    },
    {
        category: "Cálculos, Ferramentas e Apoio Prático",
        icon: <Calculator size={20} />,
        items: [
            { name: "Calculadora do Cidadão – BACEN", url: "https://www.bcb.gov.br" },
            { name: "CNIS – INSS", url: "https://meu.inss.gov.br" },
            { name: "e-CAC – Receita Federal", url: "https://cav.receita.fazenda.gov.br" },
            { name: "FGTS – Caixa Econômica", url: "https://www.caixa.gov.br" },
            { name: "Justiça do Trabalho – Cálculos", url: "https://www.trt.jus.br" }
        ]
    },
    {
        category: "Dados, Compliance e Transparência",
        icon: <Database size={20} />,
        items: [
            { name: "Portal da Transparência", url: "https://www.portaltransparencia.gov.br" },
            { name: "ANPD – Autoridade Nac. Proteção de Dados", url: "https://www.gov.br/anpd" },
            { name: "CADE", url: "https://www.gov.br/cade" },
            { name: "TCU – Tribunal de Contas da União", url: "https://www.tcu.gov.br" }
        ]
    },
    {
        category: "Produtividade, Gestão e Tecnologia Jurídica",
        icon: <ExternalLink size={20} />,
        items: [
            { name: "Legal One (Thomson Reuters)", url: "https://www.thomsonreuters.com.br" },
            { name: "CPJ-3C", url: "https://www.cpj3c.com.br" },
            { name: "Astrea", url: "https://www.astrea.net.br" },
            { name: "Projuris", url: "https://www.projuris.com.br" }
        ]
    }
];

const LinksUteisFeed = () => {
    return (
        <div className="links-feed">
            <header className="links-header">
                <h2>Links Úteis & Fontes Oficiais</h2>
                <p>Acesso rápido às principais ferramentas, tribunais e portais jurídicos.</p>
            </header>

            <div className="links-grid">
                {linksData.map((category, idx) => (
                    <motion.div
                        key={idx}
                        className="link-category-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * idx }}
                    >
                        <div className="category-header">
                            <span className="cat-icon">{category.icon}</span>
                            <h3>{category.category}</h3>
                        </div>
                        <ul className="links-list">
                            {category.items.map((item, itemIdx) => (
                                <li key={itemIdx}>
                                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>

            <style jsx>{`
        .links-feed {
          max-width: 1000px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        .links-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .links-header h2 {
          color: var(--color-primary);
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .links-header p {
          color: var(--color-text-muted);
        }

        .links-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        .link-category-card {
          background: white;
          border-top: 4px solid var(--color-secondary);
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          transition: transform 0.2s;
        }
        
        .link-category-card:hover {
          transform: translateY(-5px);
        }

        .category-header {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--color-border);
        }

        .cat-icon {
          color: var(--color-primary);
        }

        .category-header h3 {
          font-size: 1rem;
          color: var(--color-primary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin: 0;
        }

        .links-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .links-list li {
          margin-bottom: 0.8rem;
        }

        .links-list a {
          display: block;
          color: var(--color-text);
          text-decoration: none;
          font-size: 0.95rem;
          padding: 0.4rem;
          border-radius: 4px;
          transition: all 0.2s;
          border-left: 2px solid transparent;
        }

        .links-list a:hover {
          color: var(--color-primary);
          background: #f8f9fa;
          border-left-color: var(--color-secondary);
          padding-left: 0.8rem;
        }

        @media (max-width: 768px) {
          .links-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </div>
    );
};

export default LinksUteisFeed;
