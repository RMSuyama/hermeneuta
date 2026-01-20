
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { mockNews } from '../data/mockNews';
import { mockConcursos } from '../data/mockConcursos';
import { mockLeituras } from '../data/mockLeituras';
import { mockEventos } from '../data/mockEventos';
import { contacts as initialContacts } from '../data/contacts';

const INITIAL_EDITORS = [
    {
        name: 'Redação Hermeneuta',
        role: 'Equipe Editorial',
        bio: 'Compromisso com a informação jurídica de qualidade no Vale do Ribeira.',
        avatar: '',
        username: 'admin',
        password: 'admin123'
    }
];

export const useData = () => {
    const [data, setData] = useState({
        news: [],
        concursos: [],
        contacts: [],
        leituras: [],
        editors: [],
        eventos: []
    });
    const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [newsRes, eventosRes, editorsRes, contactsRes, configRes] = await Promise.all([
                supabase.from('news').select('*').order('created_at', { ascending: false }),
                supabase.from('eventos').select('*').order('date', { ascending: true }),
                supabase.from('editors').select('*'),
                supabase.from('contacts').select('*'),
                supabase.from('config').select('*')
            ]);

            // Maintenance Check
            const maintenance = configRes.data?.find(c => c.key === 'maintenance_mode');
            if (maintenance) setIsMaintenanceMode(maintenance.value === true);

            // SEEDING
            if (newsRes.data?.length === 0) {
                const seedNews = mockNews.map(n => ({
                    title: n.title,
                    category: n.category,
                    content: n.content,
                    citation: n.citation || '',
                    author: n.author || '',
                    author_id: n.authorId?.toString() || '',
                    image: n.image || '',
                    date: n.date
                }));
                await supabase.from('news').insert(seedNews);
            }

            if (eventosRes.data?.length === 0) {
                await supabase.from('eventos').insert(mockEventos.map(e => ({
                    title: e.title,
                    date: e.date,
                    location: e.location,
                    description: e.description,
                    type: e.type,
                    link: e.link
                })));
            }

            if (editorsRes.data?.length === 0) {
                await supabase.from('editors').insert(INITIAL_EDITORS);
            }

            if (contactsRes.data?.length === 0) {
                await supabase.from('contacts').insert(initialContacts);
            }

            // Sync with DB
            const { data: finalEditors } = await supabase.from('editors').select('*');
            const { data: finalContacts } = await supabase.from('contacts').select('*');
            const { data: finalNews } = await supabase.from('news').select('*').order('created_at', { ascending: false });
            const { data: finalEventos } = await supabase.from('eventos').select('*').order('date', { ascending: true });

            setData({
                news: finalNews || [],
                eventos: finalEventos || [],
                editors: finalEditors || [],
                contacts: finalContacts || [],
                concursos: mockConcursos,
                leituras: mockLeituras,
                properties: [] // Keep for compatibility even if empty
            });

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const addItem = async (key, item) => {
        try {
            const tableMap = { news: 'news', eventos: 'eventos', editors: 'editors', contacts: 'contacts' };
            const tableName = tableMap[key];

            // Align form authorId with DB author_id for news
            const itemToSave = { ...item };
            if (key === 'news' && itemToSave.authorId) {
                itemToSave.author_id = itemToSave.authorId;
                delete itemToSave.authorId;
            }

            if (!tableName) {
                setData(prev => ({ ...prev, [key]: [itemToSave, ...prev[key]] }));
                return;
            }

            const { data: inserted, error } = await supabase.from(tableName).insert([itemToSave]).select();
            if (error) throw error;
            if (inserted) {
                setData(prev => ({ ...prev, [key]: [inserted[0], ...prev[key]] }));
            }
        } catch (error) {
            console.error(`Error adding to ${key}:`, error);
        }
    };

    const deleteItem = async (key, id) => {
        try {
            const tableMap = {
                news: 'news',
                eventos: 'eventos',
                editors: 'editors',
                contacts: 'contacts',
                leituras: 'leituras',
                concursos: 'concursos'
            };
            const tableName = tableMap[key];
            if (!tableName) {
                setData(prev => ({ ...prev, [key]: prev[key].filter(i => i.id !== id) }));
                return;
            }
            const { error } = await supabase.from(tableName).delete().eq('id', id);
            if (error) throw error;
            setData(prev => ({ ...prev, [key]: prev[key].filter(i => i.id !== id) }));
        } catch (error) {
            console.error(`Error deleting from ${key}:`, error);
        }
    };

    const updateItem = async (key, id, updatedFields) => {
        try {
            const tableMap = {
                news: 'news',
                eventos: 'eventos',
                editors: 'editors',
                contacts: 'contacts',
                leituras: 'leituras',
                concursos: 'concursos'
            };
            const tableName = tableMap[key];
            if (!tableName) {
                setData(prev => ({ ...prev, [key]: prev[key].map(i => i.id === id ? { ...i, ...updatedFields } : i) }));
                return;
            }
            const { error } = await supabase.from(tableName).update(updatedFields).eq('id', id);
            if (error) throw error;
            setData(prev => ({ ...prev, [key]: prev[key].map(i => i.id === id ? { ...i, ...updatedFields } : i) }));
        } catch (error) {
            console.error(`Error updating ${key}:`, error);
        }
    };

    const updateConfig = async (key, value) => {
        try {
            const { error } = await supabase.from('config').upsert({ key, value });
            if (error) throw error;
            if (key === 'maintenance_mode') setIsMaintenanceMode(value === true);
        } catch (error) {
            console.error(`Error updating config ${key}:`, error);
        }
    };

    return { ...data, addItem, deleteItem, updateItem, updateConfig, isMaintenanceMode, loading, refresh: fetchData };
};
