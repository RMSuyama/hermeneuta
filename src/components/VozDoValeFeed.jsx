import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, ArrowLeft, Share2, Search, BookOpen, X, GraduationCap, Link as ExternalLinkIcon } from 'lucide-react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import SEO from './SEO';
import ImageWrapper from './ImageWrapper';

const VozDoValeFeed = ({ items, editors, focusMode, setFocusMode }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [filter, setFilter] = useState('TODOS');
    const [searchTerm, setSearchTerm] = useState('');

    const categories = ['TODOS', 'ARTIGO CIENTÍFICO', 'TCC/TESE', 'LIVRO', 'RESENHA'];

    if (!items || items.length === 0) return <div className="news-feed">Nenhum material acadêmico publicado.</div>;

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Hermeneuta Acadêmico',
                url: window.location.href
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copiado para a área de transferência!');
        }
    };

    // Article View (if ID is present)
    if (id) {
        const selectedArticle = items.find(n => n.id.toString() === id);

        if (!selectedArticle) {
            return (
                <div className="news-feed">
                    <p>Artigo não encontrado.</p>
                    <Link to="/academico" className="back-btn"><ArrowLeft size={16} /> Voltar para Acadêmico</Link>
                </div>
            );
        }

        const author = (editors || []).find(e => e.id === selectedArticle.author_id) ||
            (editors || []).find(e => e.name === selectedArticle.author) ||
            { name: selectedArticle.author || 'Redação Acadêmica', role: 'Colaborador', bio: '', avatar: '' };

        return (
            <div className={`article-page-view ${focusMode ? 'focus-mode-active' : ''}`}>
                <SEO type="ScholarlyArticle" data={selectedArticle} />
                <Link to="/academico" className={`back-btn ${focusMode ? 'focus-visible' : ''}`}>
                    <ArrowLeft size={16} /> Voltar para Acadêmico
                </Link>

                <motion.article
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="full-article-content"
                >
                    <div className="article-header">
                        <span className="category-tag">{selectedArticle.type}</span>
                        <h1 className="article-title">{selectedArticle.title}</h1>
                        <div className="article-meta-row">
                            <span className="meta-item"><Calendar size={14} /> {selectedArticle.year}</span>
                            <span className="meta-item"><User size={14} /> {author.name}</span>
                            <span className="meta-item"><GraduationCap size={14} /> {selectedArticle.institution}</span>
                            <div className="article-actions">
                                <button onClick={handleShare} className="action-btn" title="Compartilhar">
                                    <Share2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {selectedArticle.image && (
                        <div className="article-image-container">
                            <ImageWrapper src={selectedArticle.image} alt={selectedArticle.title} />
                        </div>
                    )}

                    <div
                        className="article-body"
                        dangerouslySetInnerHTML={{ __html: selectedArticle.content || selectedArticle.resume }}
                    />

                    {selectedArticle.link && (
                        <div className="article-citation">
                            <strong>Fonte / Referência:</strong>
                            <div style={{ marginTop: '0.5rem' }}>
                                <a href={selectedArticle.link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-secondary)', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    Ver Documento Completo <ExternalLinkIcon size={14} />
                                </a>
                            </div>
                        </div>
                    )}

                    <div className="author-profile">
                        <div className="author-avatar">
                            {author.avatar ? <img src={author.avatar} alt={author.name} /> : <User size={32} />}
                        </div>
                        <div className="author-info">
                            <h4>{author.name}</h4>
                            <span className="author-role">{author.role || 'Autor(a)'}</span>
                            {author.bio && <p className="author-bio">"{author.bio}"</p>}
                        </div>
                    </div>
                </motion.article>

            </div>
        );
    }

    const filteredItems = items.filter(item => {
        const matchesFilter = filter === 'TODOS' || item.type === filter;
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.resume && item.resume.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (item.author && item.author.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesFilter && matchesSearch;
    });

    const featured = filteredItems.find(i => i.isFeatured) || filteredItems[0];
    const others = filteredItems.filter(i => i.id !== (featured ? featured.id : null));

    return (
        <div className="news-feed">
            <div className="news-controls-row">
                <div className="news-tabs">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`news-tab-link ${filter === cat ? 'active' : ''}`}
                            onClick={() => setFilter(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                <div className="news-search">
                    <Search size={16} />
                    <input
                        type="text"
                        placeholder="Pesquisar no acervo..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="main-grid">
                <section className="featured-column">
                    {featured ? (
                        <motion.article
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="featured-article"
                        >
                            <Link to={`/academico/${featured.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className="category-tag">{featured.type}</div>
                                <h2>{featured.title}</h2>
                                {featured.image && <ImageWrapper src={featured.image} alt={featured.title} className="featured-img" />}
                                <div className="excerpt" dangerouslySetInnerHTML={{ __html: featured.resume || (featured.content ? featured.content.substring(0, 300) + '...' : '') }} />
                                <div className="article-meta">
                                    {featured.year} • {featured.author} • {featured.institution}
                                </div>
                                <button className="read-more">
                                    Ler Artigo <ArrowRight size={14} />
                                </button>
                            </Link>
                        </motion.article>
                    ) : (
                        <div className="empty-state">
                            <p>Nenhum material encontrado nesta categoria.</p>
                        </div>
                    )}

                    <div className="sub-grid">
                        {others.map((item, idx) => (
                            <motion.article
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * (idx + 1) }}
                                className="sub-article"
                            >
                                <Link to={`/academico/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div className="category-tag small">{item.type}</div>
                                    <h3>{item.title}</h3>
                                    <div className="excerpt small" dangerouslySetInnerHTML={{ __html: item.resume ? item.resume.substring(0, 150) + '...' : '' }} />
                                    <div className="article-meta small">
                                        {item.author} | {item.year}
                                    </div>
                                </Link>
                            </motion.article>
                        ))}
                    </div>
                </section>

                <aside className="sidebar">
                    <div className="sidebar-section">
                        <h4 className="sidebar-title">Conselho Editorial</h4>
                        <div className="date-display">
                            Produção acadêmica e técnica do Vale do Ribeira.
                        </div>
                    </div>
                    <div className="sidebar-section">
                        <h4 className="sidebar-title">Portais Acadêmicos</h4>
                        <ul className="links-list">
                            <li><a href="https://scholar.google.com.br/" target="_blank" rel="noopener noreferrer">Google Acadêmico</a></li>
                            <li><a href="https://www.scielo.org/" target="_blank" rel="noopener noreferrer">SciELO Brasil</a></li>
                            <li><a href="https://lattes.cnpq.br/" target="_blank" rel="noopener noreferrer">Plataforma Lattes</a></li>
                        </ul>
                    </div>
                </aside>
            </div>

        </div>
    );
};

export default VozDoValeFeed;
