import { useState, useEffect } from 'react';
import { mockNews } from '../data/mockNews';
import { mockConcursos } from '../data/mockConcursos';
import { mockProperties } from '../data/mockProperties';
import { mockJurisprudencias } from '../data/mockJurisprudencias';
import { mockLeituras } from '../data/mockLeituras';
import { contacts as initialContacts } from '../data/contacts';

const STORAGE_KEYS = {
    news: 'hermeneuta_news_data',
    concursos: 'hermeneuta_concursos_data',
    contacts: 'hermeneuta_contacts_data',
    properties: 'hermeneuta_properties_data',
    jurisprudencias: 'hermeneuta_jurisprudencias_data',
    leituras: 'hermeneuta_leituras_data',
    editors: 'hermeneuta_editors_data'
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
    properties: mockProperties,
    jurisprudencias: mockJurisprudencias,
    leituras: mockLeituras,
    editors: INITIAL_EDITORS
};

export const useData = () => {
    const [data, setData] = useState({
        news: [],
        concursos: [],
        contacts: [],
        properties: [],
        jurisprudencias: [],
        leituras: [],
        editors: []
    });
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
            date: (key === 'news' || key === 'jurisprudencias') ? new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }) : undefined
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
