import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from './SEO';
import ImageWrapper from './ImageWrapper';
import { FileText, Book, GraduationCap, Download, ExternalLink, Search, Filter, BookOpen, ArrowRight, Minimize2, X } from 'lucide-react';

// New ProductCard component
const ProductCard = ({ link, title }) => {
    if (!link) return null;
    return (
        <a href={link} target="_blank" rel="noopener noreferrer" className="product-card">
            <div className="product-card-content">
                <span className="product-card-text">Ver na Amazon / Fonte</span>
                <ArrowRight size={16} />
            </div>
        </a>
    );
};

const VozDoValeFeed = ({ items, focusMode, setFocusMode }) => {
    const [filter, setFilter] = useState('TODOS');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);

    const categories = ['TODOS', 'ARTIGO CIENTÍFICO', 'TCC/TESE', 'LIVRO'];

    const featuredItem = items?.find(i => i.isFeatured);

    const filteredItems = items?.filter(item => {
        if (item.isFeatured) return false;

        const matchesFilter = filter === 'TODOS' || item.type === filter;
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.resume.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    }) || [];

    const getIcon = (type) => {
        switch (type) {
            case 'LIVRO': return <Book size={24} className="text-secondary" />;
            case 'TCC/TESE': return <GraduationCap size={24} className="text-primary" />;
            default: return <FileText size={24} className="text-secondary" />;
        }
    };

    return (
        <div className={`voz-feed-container ${focusMode ? 'focus-mode-active' : ''}`}>
            <section className="section-header">
                <h2 className="section-title">Acadêmico</h2>
                <div className="section-line"></div>
                <p className="section-subtitle">Doutrina, Pesquisa & Jurisprudência Regional</p>
            </section>

            <div className="main-grid">
                <section className="featured-column">
                    {featuredItem && (filter === 'TODOS' || filter === featuredItem.type) && (
                        <motion.article
                            className="featured-voz-article"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="voz-category-badge">{featuredItem.type}</div>
                            <h2 className="featured-title" onClick={() => setSelectedItem(featuredItem)}>{featuredItem.title}</h2>
                            <div className="featured-meta">
                                <span>Por <strong>{featuredItem.author}</strong></span> • <span>{featuredItem.institution}</span>
                            </div>
                            {featuredItem.image && (
                                <ImageWrapper
                                    src={featuredItem.image}
                                    alt={featuredItem.title}
                                    className="featured-voz-img"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => setSelectedItem(featuredItem)}
                                />
                            )}
                            <p className="featured-excerpt">{featuredItem.resume}</p>
                            <button onClick={() => setSelectedItem(featuredItem)} className="read-more-btn">
                                Continuar Leitura <BookOpen size={14} />
                            </button>
                        </motion.article>
                    )}

                    <div className="voz-controls-row">
                        <div className="voz-tabs-new">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    className={`voz-tab-link ${filter === cat ? 'active' : ''}`}
                                    onClick={() => setFilter(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <div className="voz-search-new">
                            <Search size={16} />
                            <input
                                type="text"
                                placeholder="Pesquisar no acervo..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="academic-sub-grid">
                        {filteredItems.map(item => (
                            <motion.article
                                key={item.id}
                                className="academic-item"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                onClick={() => setSelectedItem(item)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="item-type-tag">{item.type}</div>
                                <h3 onClick={(e) => {
                                    e.stopPropagation();
                                    item.content ? setSelectedItem(item) : window.open(item.link, '_blank');
                                }}>
                                    {item.title}
                                </h3>
                                <div className="item-meta">
                                    {item.author} | {item.year}
                                </div>
                                <p>{item.resume.substring(0, 120)}...</p>
                            </motion.article>
                        ))}
                    </div>

                    {filteredItems.length === 0 && (
                        <div className="empty-state">
                            <p>Nenhum material encontrado para esta categoria.</p>
                        </div>
                    )}
                </section>

                <aside className="academic-sidebar">
                    <div className="sidebar-box">
                        <h4 className="sidebar-box-title">Destaques do Autor</h4>
                        <div className="author-spotlight">
                            <div className="spotlight-avatar">
                                <GraduationCap size={32} />
                            </div>
                            <div className="spotlight-info">
                                <h5>Membros do Conselho</h5>
                                <p>Acadêmicos e profissionais que contribuem para o acervo regional.</p>
                            </div>
                        </div>
                    </div>

                    <div className="sidebar-box">
                        <h4 className="sidebar-box-title">Links Acadêmicos</h4>
                        <ul className="academic-links">
                            <li><a href="https://scholar.google.com.br/" target="_blank" rel="noopener noreferrer"><ExternalLink size={14} /> Google Acadêmico</a></li>
                            <li><a href="https://www.scielo.org/" target="_blank" rel="noopener noreferrer"><ExternalLink size={14} /> SciELO Brasil</a></li>
                            <li><a href="https://lattes.cnpq.br/" target="_blank" rel="noopener noreferrer"><ExternalLink size={14} /> Plataforma Lattes</a></li>
                            <li><a href="https://www.periodicos.capes.gov.br/" target="_blank" rel="noopener noreferrer"><ExternalLink size={14} /> Periódicos CAPES</a></li>
                        </ul>
                    </div>
                </aside>
            </div>

            {selectedItem && (
                <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
                    <motion.div
                        className="modal-content academic-modal"
                        onClick={e => e.stopPropagation()}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                    >
                        <SEO type="ScholarlyArticle" data={selectedItem} />
                        <button className="close-modal" onClick={() => setSelectedItem(null)}><X size={24} /></button>

                        <div className="modal-header">
                            <div className="item-type-tag">{selectedItem.type}</div>
                            <h2>{selectedItem.title}</h2>
                            <div className="modal-meta">
                                <span>Por <strong>{selectedItem.author}</strong></span> &bull; <span>{selectedItem.year}</span> &bull; <span>{selectedItem.institution}</span>
                            </div>
                        </div>

                        <div className="modal-body-wrapper">
                            <div className="modal-body" dangerouslySetInnerHTML={{ __html: selectedItem.content || `<p>${selectedItem.resume}</p>` }} />

                            {selectedItem.link && (
                                <div className="product-recommendation">
                                    <h4>Leitura Recomendada</h4>
                                    <ProductCard link={selectedItem.link} title={selectedItem.title} />
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}

            {focusMode && (selectedItem || featuredItem) && <div className="focus-indicator">Modo Foco Ativo</div>}

            <style jsx>{`
                .voz-feed-container {
                    padding: 2rem 0;
                    max-width: 1200px;
                    margin: 0 auto;
                    transition: all 0.5s ease;
                }

                .section-header { text-align: center; margin-bottom: 4rem; }
                .section-title { font-family: var(--font-serif); font-size: 3.5rem; color: var(--color-primary); margin-bottom: 0.5rem; letter-spacing: -2px; }
                .section-line { width: 80px; height: 4px; background: var(--color-accent); margin: 0 auto 1.5rem; }
                .section-subtitle { font-family: var(--font-sans); color: var(--color-text-muted); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 4px; font-weight: 700; }

                .main-grid {
                    display: grid;
                    grid-template-columns: 1fr 300px;
                    gap: 4rem;
                }

                .featured-voz-article {
                    margin-bottom: 4rem;
                    padding-bottom: 3rem;
                    border-bottom: 4px double var(--color-border);
                }

                .voz-category-badge {
                    font-size: 0.7rem;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    font-weight: 800;
                    color: var(--color-secondary);
                    margin-bottom: 1rem;
                }

                .featured-title {
                    font-family: var(--font-serif);
                    font-size: 3rem;
                    line-height: 1.1;
                    margin-bottom: 1.5rem;
                    color: var(--color-primary);
                    cursor: pointer;
                    transition: color 0.2s;
                }
                .featured-title:hover { color: var(--color-secondary); }

                .featured-meta {
                    font-size: 0.9rem;
                    color: var(--color-text-muted);
                    margin-bottom: 2rem;
                    display: flex;
                    gap: 1rem;
                    align-items: center;
                }

                .featured-voz-img {
                    width: 100%;
                    height: 450px;
                    margin-bottom: 2rem;
                    border-radius: 4px;
                }

                .featured-excerpt {
                    font-size: 1.25rem;
                    line-height: 1.6;
                    color: var(--color-text);
                    margin-bottom: 2rem;
                    font-family: var(--font-serif);
                }

                .read-more-btn {
                    background: none;
                    border: none;
                    color: var(--color-secondary);
                    font-weight: 800;
                    text-transform: uppercase;
                    font-size: 0.8rem;
                    display: flex;
                    align-items: center;
                    gap: 0.6rem;
                    cursor: pointer;
                    padding: 0;
                    letter-spacing: 1px;
                }
                .read-more-btn:hover { text-decoration: underline; }

                .voz-controls-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin: 3rem 0;
                    padding: 1.5rem 0;
                    border-top: 1px solid var(--color-border);
                    border-bottom: 1px solid var(--color-border);
                }

                .voz-tabs-new { display: flex; gap: 2rem; }
                .voz-tab-link {
                    background: none;
                    border: none;
                    padding: 0;
                    font-size: 0.75rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    color: var(--color-text-muted);
                    cursor: pointer;
                    border-bottom: 2px solid transparent;
                    transition: all 0.2s;
                }
                .voz-tab-link.active {
                    color: var(--color-primary);
                    border-bottom-color: var(--color-accent);
                }
                body.dark-mode .voz-tab-link.active { color: var(--color-accent); }

                .voz-search-new {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: var(--color-background);
                    border: 1px solid var(--color-border);
                    padding: 0.4rem 1rem;
                    width: 280px;
                }
                .voz-search-new input {
                    border: none;
                    background: none;
                    outline: none;
                    font-size: 0.8rem;
                    width: 100%;
                    color: var(--color-text);
                }

                .academic-sub-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 3rem;
                    padding-top: 2rem;
                }

                .academic-item {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .item-type-tag {
                    font-size: 0.65rem;
                    text-transform: uppercase;
                    font-weight: 800;
                    color: var(--color-secondary);
                    letter-spacing: 1.5px;
                }

                .academic-item h3 {
                    font-family: var(--font-serif);
                    font-size: 1.5rem;
                    color: var(--color-primary);
                    cursor: pointer;
                    line-height: 1.2;
                }
                .academic-item h3:hover { color: var(--color-secondary); }

                .item-meta {
                    font-size: 0.8rem;
                    color: var(--color-text-muted);
                    font-weight: 600;
                    text-transform: uppercase;
                }

                .academic-item p {
                    font-size: 0.95rem;
                    line-height: 1.5;
                    color: var(--color-text);
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                /* Focus Mode Styles */
                .focus-toggle {
                    position: fixed;
                    bottom: 2rem;
                    right: 2rem;
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: var(--color-primary);
                    color: white;
                    border: none;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    z-index: 1000;
                    transition: all 0.3s;
                }
                .focus-toggle:hover { transform: scale(1.1); background: var(--color-accent); color: black; }
                .focus-toggle.active { background: var(--color-accent); color: black; }

                .focus-mode-active .academic-sidebar,
                .focus-mode-active .section-header,
                .focus-mode-active .voz-controls-row {
                    display: none;
                }

                .focus-mode-active .main-grid {
                    grid-template-columns: 1fr;
                    max-width: 800px;
                    margin: 0 auto;
                }

                .focus-mode-active {
                    background: #fdfaf5; /* Sepia-ish background */
                    min-height: 100vh;
                    padding: 4rem 1rem;
                }

                body.dark-mode .focus-mode-active {
                    background: #0f172a; /* Deep blue-gray for focus dark mode */
                }

                .focus-mode-active .featured-title {
                    font-size: 4rem;
                    text-align: center;
                }

                .focus-mode-active .featured-excerpt {
                    font-size: 1.5rem;
                    line-height: 1.8;
                    max-width: 700px;
                    margin: 0 auto 3rem;
                }

                /* Sidebar */
                .sidebar-box {
                    margin-bottom: 3rem;
                }
                .sidebar-box-title {
                    font-size: 0.9rem;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    font-weight: 800;
                    color: var(--color-primary);
                    margin-bottom: 1.5rem;
                    padding-bottom: 0.5rem;
                    border-bottom: 2px solid var(--color-primary);
                }

                .author-spotlight {
                    display: flex;
                    gap: 1rem;
                    align-items: center;
                }
                .spotlight-avatar {
                    width: 60px;
                    height: 60px;
                    background: var(--color-border);
                    border-radius: 4px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--color-text-muted);
                }
                .spotlight-info h5 { margin: 0 0 0.2rem 0; font-size: 1rem; }
                .spotlight-info p { margin: 0; font-size: 0.8rem; color: var(--color-text-muted); }

                .academic-links {
                    list-style: none;
                    padding: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                .academic-links a {
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                    color: var(--color-text);
                    text-decoration: none;
                    font-weight: 600;
                    transition: color 0.2s;
                }
                .academic-links a:hover { color: var(--color-secondary); }

                /* Modal */
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0,0,0,0.85);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 2000;
                    padding: 2rem;
                }
                .academic-modal {
                    background: var(--color-background);
                    width: 100%;
                    max-width: 900px;
                    max-height: 90vh;
                    overflow-y: auto;
                    border-radius: 8px;
                    position: relative;
                    padding: 4rem;
                    border: 1px solid var(--color-border);
                }
                .close-modal {
                    position: absolute;
                    top: 2rem;
                    right: 2rem;
                    background: none;
                    border: none;
                    color: var(--color-text-muted);
                    cursor: pointer;
                }
                .modal-header { margin-bottom: 3rem; text-align: center; }
                .modal-header h2 { font-family: var(--font-serif); font-size: 2.5rem; margin: 1rem 0; color: var(--color-primary); }
                .modal-meta { color: var(--color-text-muted); font-size: 0.9rem; }
                .modal-body { line-height: 1.8; font-size: 1.1rem; color: var(--color-text); }
                
                .product-recommendation {
                    margin-top: 4rem;
                    padding-top: 2rem;
                    border-top: 1px solid var(--color-border);
                }
                .product-recommendation h4 { 
                    font-size: 0.8rem; 
                    text-transform: uppercase; 
                    letter-spacing: 2px; 
                    color: var(--color-secondary);
                    margin-bottom: 1.5rem;
                }

                /* Product Card (Internal Placeholder - normally separate component) */
                .product-card {
                    display: block;
                    background: var(--color-background);
                    border: 1px solid var(--color-border);
                    padding: 1.5rem;
                    text-decoration: none;
                    color: var(--color-text);
                    transition: all 0.3s;
                    border-radius: 4px;
                    max-width: 400px;
                }
                .product-card:hover {
                    border-color: #FACC15;
                    box-shadow: 0 10px 30px rgba(250,204,21,0.1);
                    transform: translateY(-5px);
                }
                .product-card-content { display: flex; justify-content: space-between; align-items: center; }
                .product-card-text { font-weight: 700; text-transform: uppercase; font-size: 0.75rem; color: #FACC15; }

                @media (max-width: 1000px) {
                    .main-grid { grid-template-columns: 1fr; }
                    .academic-sidebar { margin-top: 4rem; border-top: 4px double var(--color-border); padding-top: 4rem; }
                    .academic-modal { padding: 2rem; }
                }
            `}</style>
        </div>
    );
};

export default VozDoValeFeed;
