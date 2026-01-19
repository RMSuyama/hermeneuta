import React, { useState } from 'react';
import { Search, MapPin, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ContactDirectory = ({ contacts }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = contacts.filter(c =>
    c.comarca.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.setor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="contact-directory">
      <div className="section-header">
        <h2 className="section-title">Guia de Contatos Judiciários</h2>
        <p className="page-intro">Localize rapidamente ramais e telefones de Fóruns, OAB e órgãos públicos do Vale do Ribeira.</p>
        <div className="search-container">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por comarca ou setor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="contacts-list">
        <div className="list-headers">
          <span className="header-item">Comarca</span>
          <span className="header-item flex-grow">Setor / Órgão</span>
          <span className="header-item">Telefone</span>
          <span className="header-item">Ação</span>
        </div>

        <AnimatePresence>
          {filteredContacts.map((contact, idx) => (
            <motion.div
              key={`${contact.comarca}-${contact.setor}-${idx}`}
              layout
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="contact-row"
            >
              <div className="col-comarca">
                <span className="comarca-tag">{contact.comarca}</span>
              </div>

              <div className="col-setor flex-grow">
                <h3 className="setor-name">{contact.setor}</h3>
              </div>

              <div className="col-phone">
                <span className="phone-num">{contact.telefone}</span>
              </div>

              <div className="col-action">
                <a href={`tel:${contact.telefone.replace(/\D/g, '')}`} className="call-btn">
                  <PhoneCall size={18} />
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <style jsx>{`
                .contact-directory { margin-top: 2rem; }
                
                .section-header { text-align: center; margin-bottom: 3rem; }
                .section-title { font-size: 2.5rem; margin-bottom: 1rem; }
                .page-intro { color: var(--color-text-muted); margin-bottom: 2rem; }

                .search-container { position: relative; max-width: 600px; margin: 0 auto; }
                .search-icon { position: absolute; left: 1.25rem; top: 50%; transform: translateY(-50%); color: var(--color-text-muted); }
                .search-input { width: 100%; padding: 1.25rem 1.25rem 1.25rem 3.5rem; border: 1px solid var(--color-border); background: white; font-family: var(--font-sans); font-size: 1rem; border-radius: 4px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }

                .contacts-list { border-top: 2px solid var(--color-primary); background: white; }
                .list-headers { display: flex; padding: 1rem 1.5rem; background: var(--color-background); border-bottom: 1px solid var(--color-border); font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: var(--color-text-muted); }
                .header-item { width: 180px; }
                .flex-grow { flex-grow: 1; }

                .contact-row { display: flex; align-items: center; padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--color-border); transition: background 0.2s; }
                .contact-row:hover { background: #fafafa; }

                .col-comarca { width: 180px; }
                .comarca-tag { font-size: 0.7rem; font-weight: 800; color: var(--color-secondary); text-transform: uppercase; border-left: 2px solid var(--color-secondary); padding-left: 0.5rem; }

                .col-setor { flex-grow: 1; }
                .setor-name { font-size: 1.1rem; font-family: var(--font-serif); }

                .col-phone { width: 180px; }
                .phone-num { font-size: 1rem; font-weight: 600; font-family: var(--font-sans); }

                .col-action { width: 50px; text-align: right; }
                .call-btn { display: inline-flex; align-items: center; justify-content: center; color: var(--color-text-muted); transition: color 0.2s; }
                .call-btn:hover { color: var(--color-secondary); }

                @media (max-width: 850px) {
                    .list-headers { display: none; }
                    .contact-row { flex-direction: column; align-items: flex-start; gap: 0.5rem; padding: 1.5rem; }
                    .col-comarca, .col-setor, .col-phone, .col-action { width: 100%; }
                    .col-action { text-align: left; margin-top: 0.5rem; }
                }
            `}</style>
    </div>
  );
};

export default ContactDirectory;
