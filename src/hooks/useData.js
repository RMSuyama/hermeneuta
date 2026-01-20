import { useState, useEffect } from 'react';
import { mockNews } from '../data/mockNews';
import { mockConcursos } from '../data/mockConcursos';
import { mockLeituras } from '../data/mockLeituras';
import { mockEventos } from '../data/mockEventos';
import { contacts as initialContacts } from '../data/contacts';

const STORAGE_KEYS = {
    news: 'hermeneuta_news_data_v2026',
    concursos: 'hermeneuta_concursos_data_v2026',
    contacts: 'hermeneuta_contacts_data_v2026',
    leituras: 'hermeneuta_leituras_data_v2026',
    editors: 'hermeneuta_editors_data_v2026',
    eventos: 'hermeneuta_eventos_data_v2026'
};

const INITIAL_EDITORS = [
    {
        id: 'editor_default',
        name: 'Redação Hermeneuta',
        role: 'Equipe Editorial',
        bio: 'Compromisso com a informação jurídica de qualidade no Vale do Ribeira.',
        avatar: ''
    }
];

const INITIAL_DATA = {
    news: mockNews,
    concursos: mockConcursos,
    contacts: initialContacts,
    leituras: mockLeituras,
    editors: INITIAL_EDITORS,
    eventos: mockEventos
};

export const useData = () => {
    const [data, setData] = useState(INITIAL_DATA);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadedData = {};
        Object.keys(STORAGE_KEYS).forEach(key => {
            const saved = localStorage.getItem(STORAGE_KEYS[key]);
            if (saved) {
                try {
                    loadedData[key] = JSON.parse(saved);
                } catch (e) {
                    console.error(`Error parsing ${key}:`, e);
                    loadedData[key] = INITIAL_DATA[key];
                }
            } else {
                loadedData[key] = INITIAL_DATA[key];
            }
        });
        setData(loadedData);
        setLoading(false);
    }, []);

    const saveData = (key, newList) => {
        setData(prev => ({ ...prev, [key]: newList }));
        localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(newList));
    };

    const addItem = (key, item) => {
        const newItem = {
            ...item,
            id: Date.now(),
            date: (key === 'news' || key === 'eventos') ? item.date || new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }) : undefined
        };
        const updated = [newItem, ...data[key]];
        saveData(key, updated);
    };

    const deleteItem = (key, id) => {
        const updated = data[key].filter(item => item.id !== id);
        saveData(key, updated);
    };

    const updateItem = (key, id, updatedFields) => {
        const updated = data[key].map(item => item.id === id ? { ...item, ...updatedFields } : item);
        saveData(key, updated);
    };

    return { ...data, addItem, deleteItem, updateItem, loading };
};
