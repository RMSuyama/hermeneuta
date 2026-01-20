
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
        password: '123'
    }
];

export const useData = () => {
    const [data, setData] = useState({
        news: [],
        concursos: [],
        contacts: [],
        leituras: [], // Leituras might still be local if not in DB, but let's assume local for now or add to DB later
        editors: [],
        eventos: []
    });
    const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch all tables in parallel
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

            // SEEDING LOGIC: If tables are empty, populate with mocks
            if (newsRes.data?.length === 0) {
                console.log('Seeding News...');
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
                newsRes.data = seedNews; // Update local reference
            }

            if (eventosRes.data?.length === 0) {
                console.log('Seeding Eventos...');
                await supabase.from('eventos').insert(mockEventos.map(e => ({
                    title: e.title,
                    date: e.date,
                    location: e.location,
                    description: e.description,
                    type: e.type,
                    link: e.link
                })));
                eventosRes.data = mockEventos;
            }

            if (editorsRes.data?.length === 0) {
                // Check if we need to seed editors
                console.log('Seeding Editors...');
                await supabase.from('editors').insert(INITIAL_EDITORS);
            }

            // For contacts, we can seed or just leave them
            if (contactsRes.data?.length === 0) {
                await supabase.from('contacts').insert(initialContacts);
            }

            // Re-fetch or just use mixed data? Let's assume re-fetch or manual set for simplicity in this flow
            // Actually, let's just use what we have or refetch if we seeded. 
            // Better to simple set what we got.

            // Re-fetch editors and contacts to be sure
            const { data: finalEditors } = await supabase.from('editors').select('*');
            const { data: finalContacts } = await supabase.from('contacts').select('*');
            const { data: finalNews } = await supabase.from('news').select('*').order('created_at', { ascending: false });
            const { data: finalEventos } = await supabase.from('eventos').select('*').order('date', { ascending: true });


            setData({
                news: finalNews || [],
                eventos: finalEventos || [],
                editors: finalEditors || [],
                contacts: finalContacts || [],
                concursos: mockConcursos, // Still local for now unless we add table
                leituras: mockLeituras    // Still local for now
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
            // Mapping key to table name
            const tableMap = {
                news: 'news',
                eventos: 'eventos',
                editors: 'editors',
                contacts: 'contacts'
            };

            const tableName = tableMap[key];
            if (!tableName) {
                // For non-DB items (concursos, leituras), fallback to local state update only (won't persist on refresh)
                // Or better, log warning. For this scope, let's assume we prioritized DB items.
                setData(prev => ({ ...prev, [key]: [item, ...prev[key]] }));
                return;
            }

            const { data: inserted, error } = await supabase.from(tableName).insert([item]).select();

            if (error) throw error;

            if (inserted) {
                setData(prev => ({ ...prev, [key]: [inserted[0], ...prev[key]] }));
            }
        } catch (error) {
            console.error(`Error adding to ${key}:`, error);
            alert("Erro ao salvar. Verifique o console.");
        }
    };

    const deleteItem = async (key, id) => {
        try {
            const tableMap = { news: 'news', eventos: 'eventos', editors: 'editors', contacts: 'contacts' };
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
            const tableMap = { news: 'news', eventos: 'eventos', editors: 'editors', contacts: 'contacts' };
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
            const { error } = await supabase.from('config').upsert({ key, value }).eq('key', key);
            if (error) throw error;
            if (key === 'maintenance_mode') setIsMaintenanceMode(value === true);
        } catch (error) {
            console.error(`Error updating config ${key}:`, error);
        }
    };

    return { ...data, addItem, deleteItem, updateItem, updateConfig, isMaintenanceMode, loading, refresh: fetchData };
};
